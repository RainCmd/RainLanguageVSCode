import * as vscode from "vscode";
import FormatProvider from './formatterProvider'
import { InlineDebugAdapterFactory } from "./debugger/DebugAdapterFactory";
import { RainDebugConfigurationProvider } from "./debugger/DebugConfigurationProvider";
import { KernelStateViewProvider } from "./KernelStateViewProvider";
import { readFile } from "fs";
import * as rainLanguageClient from "./LanguageClinet";
import { RainEvaluatableExpressionProvider } from "./EvaluatableExpressionProvider";
import { SemanticTokenProvider, legend } from "./SemanticTokenProvider";

export const extensionDebug = false
export let kernelStateViewProvider: KernelStateViewProvider;
export const kernelFileName = "kernel"
export const rainLanguageDocScheme = "rain-language"

export async function activate(context: vscode.ExtensionContext) {
    vscode.commands.executeCommand("setContext", "extensionDebug", extensionDebug)
    const documentSelector: vscode.DocumentSelector = {
        language: 'RainLanguage',
    };
    kernelStateViewProvider = new KernelStateViewProvider(context.extensionUri)
    context.subscriptions.push(
        vscode.languages.registerDocumentRangeFormattingEditProvider(documentSelector, new FormatProvider()),
        vscode.languages.registerOnTypeFormattingEditProvider(documentSelector, new FormatProvider(), '\n', ';'),
        vscode.languages.registerEvaluatableExpressionProvider(documentSelector, new RainEvaluatableExpressionProvider()),

        vscode.debug.registerDebugConfigurationProvider("RainLanguage调试运行", new RainDebugConfigurationProvider(context)),
        vscode.debug.registerDebugAdapterDescriptorFactory("RainLanguage调试运行", new InlineDebugAdapterFactory()),

        vscode.debug.registerDebugConfigurationProvider("RainLanguage附加到进程", new RainDebugConfigurationProvider(context)),
        vscode.debug.registerDebugAdapterDescriptorFactory("RainLanguage附加到进程", new InlineDebugAdapterFactory()),

        vscode.window.registerWebviewViewProvider("RainKernelState", kernelStateViewProvider),

        vscode.commands.registerCommand('cmd.rain.kernel-document', async () => vscode.window.showTextDocument(vscode.Uri.parse(`${rainLanguageDocScheme}:${kernelFileName}.rain`))),
        vscode.workspace.registerTextDocumentContentProvider(rainLanguageDocScheme, {
            provideTextDocumentContent: function (uri: vscode.Uri) { return langugaePreviewDoc.get(uri.path) }
        }),

        vscode.commands.registerCommand('cmd.rain.restart-language-server', () => rainLanguageClient.RestartServer(context)),

        vscode.languages.registerDocumentSemanticTokensProvider(documentSelector, new SemanticTokenProvider(), legend),

        vscode.commands.registerCommand('cmd.rain.execute', (fullname) =>
            vscode.debug.startDebugging(undefined, {
                type: "RainLanguage调试运行",
                name: "调试",
                request: "launch",
                execute: fullname
            })),
        vscode.commands.registerCommand('cmd.rain.peek-reference', (position) => {
            if(vscode.window.activeTextEditor != null){
                vscode.window.activeTextEditor.selection = new vscode.Selection(position, position)
            }
            vscode.commands.executeCommand("editor.action.referenceSearch.trigger")
        })
    );
    
    readFile(context.extensionPath + "/" + kernelFileName, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            RegistRainLanguagePreviewDoc(`${rainLanguageDocScheme}:${kernelFileName}.rain`, data.toString())
        }
    })
    await rainLanguageClient.StartServer(context);
}
export async function deactivate() {
    rainLanguageClient.StopServer();
}

const langugaePreviewDoc = new Map<string, string>()
export function RegistRainLanguagePreviewDoc(path: string, content: string) {
    const uri = vscode.Uri.parse(path)
    if (uri.scheme == rainLanguageDocScheme)
        langugaePreviewDoc.set(uri.path, content)
}