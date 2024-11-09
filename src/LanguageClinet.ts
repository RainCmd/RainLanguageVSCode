
import { LanguageClient, LanguageClientOptions, ServerOptions, StreamInfo } from 'vscode-languageclient/node'
import * as vscode from 'vscode'
import * as fs from 'fs'
import * as net from 'net'
import * as cp from 'child_process'
import { RegistRainLanguagePreviewDoc, extensionDebug, kernelFileName, rainLanguageDocScheme } from './extension';
import { RainDebugConfiguration } from './debugger/DebugConfigurationProvider';

let client: LanguageClient;

export async function RestartServer(context: vscode.ExtensionContext) {
    StopServer()
    await StartServer(context)
}

async function GetProjectName(): Promise<string | null> {
    if (vscode.workspace.workspaceFolders.length > 0) {
        const projectPath = vscode.workspace.workspaceFolders[0].uri.fsPath
        const data = await fs.promises.readFile(projectPath + "/.vscode/launch.json", 'utf-8')
        const cfgs = JSON.parse(data).configurations
        if (cfgs && cfgs.length > 0) {
            for (let index = 0; index < cfgs.length; index++) {
                const element = cfgs[index];
                if (element.ProjectName) {
                    return (String)(element.ProjectName)
                }
            }
        }
    }
    return null
}

let libraries : string[] = []
const libraryDirMap : Map<string, string> = new Map()
async function RefreshReferences() {
    try {
        if(vscode.workspace.workspaceFolders.length > 0){
            const projectPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
            const data = await fs.promises.readFile(projectPath + "/.vscode/launch.json", 'utf-8')
            const cfgs = JSON.parse(data).configurations
            const referencePaths = []
            cfgs.forEach((element: RainDebugConfiguration) => {
                if (element.type == 'rain.attach' || element.type == 'rain.launch') {
                    if(element.ReferencePath){
                        element.ReferencePath.split(';').forEach((value: string) => {
                            if(value.startsWith('.')){
                                referencePaths.push(projectPath + '/' + value)
                            }
                            else{
                                referencePaths.push(value)
                            }
                        })
                    }
                }
            });
            referencePaths.forEach(dir => {
                const files = fs.readdirSync(dir, {withFileTypes : true})
                files.forEach(file=>{
                    if(file.isFile()){
                        if(file.name.endsWith('.rdll')) {
                            const name = file.name.substring(0, file.name.length - 5)
                            libraries.push(name)
                            libraryDirMap.set(name, dir)
                        }
                    }
                })
            })
        }
    } catch (error) {
        vscode.window.showErrorMessage("解析配置文件时出现错误：" + error)
    }
}

let extensionPath : string
async function LoadRely(rely: string): Promise<string> {
    return new Promise<string>((resolve, reject) =>{
        const path = libraryDirMap.get(rely)
        if(path){
            const params : string[] = []
            params.push("-path")
            params.push(extensionPath + "/LoadRely")
            params.push("-name")
            params.push("__LoadRely__")
            params.push("-entry")
            params.push("__LoadRely__.Main")
            params.push("-referencePath")
            params.push(path)
            params.push("-forcedReference")
            params.push(rely)
            params.push("-silent")
            const p = cp.execFile(extensionPath + "/bin/float/RainLauncher.exe", params)
            let content = ""
            p.stdout.on('data', (data : Buffer) => {
                content += data.toString()
            }).on('close', ()=>{
                RegistRainLanguagePreviewDoc(`${rainLanguageDocScheme}:${rely}.rain`, content)
                resolve(content)
            })
        }
        else{
            reject("路径查找失败")
        }
    })
}

function GetCPServerOptions(context: vscode.ExtensionContext): ServerOptions {
    const binPath = `${context.extension.extensionUri.fsPath}/bin/`
    let serverArgs: string[] = []
    
    return {
        command: `${binPath}server/RainLanguageServer.exe`,
        args: serverArgs
    }
}

function GetSocketServerOperation() {
    return new Promise<StreamInfo>((resolve, reject) => {
        const client = net.connect({
            port: 14567,
            host: "127.0.0.1"
        })
        client.on('connect', () => {
            resolve({
                reader: client,
                writer: client
            })
        })
        client.on('error', err => {
            reject(err)
        })
    })
}

export async function StartServer(context: vscode.ExtensionContext) {
    const serverOptions = extensionDebug ? GetSocketServerOperation : GetCPServerOptions(context)
    extensionPath = context.extensionUri.fsPath
    const projectName = await GetProjectName()
    await RefreshReferences()
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{
            language: "RainLanguage"
        }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher("**/*.rain")
        },
        initializationOptions: {
            kernelDefinePath: `${context.extension.extensionUri.fsPath}/${kernelFileName}`,
            projectName: projectName,
            imports: libraries
        }
    }
    client = new LanguageClient("RainLanguage", "Rain语言服务", serverOptions, clientOptions)
    client.onRequest("rainlanguage/loadRely", LoadRely)
    client.start().then(() => {
        console.log("RainLanguage服务客户端：启动")
    }).catch((error) => {
        console.log("RainLanguage服务客户端：启动失败:" + error)
        client = null
    })
}

export async function GetSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken) {
    if (client) {
        return await client.sendRequest<any>("rainlanguage/getSemanticTokens", { uri: document.uri.toString() }, token)
    }
    return undefined
}

export function StopServer() {
    if (client) {
        console.log("RainLanguage服务客户端：终止")
        client.stop()
        client = null
    }
}