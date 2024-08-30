
import * as vscode from 'vscode'
import { GetSemanticTokens } from './LanguageClinet'

//https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide
const tokenTypes = ['namespace', 'type', 'enum', 'enumMember', 'struct', 'class', 'interface', 'function', 'method', 'macro', 'variable', 'parameter', 'operator', "number", "keyword", "label"]
export const legend = new vscode.SemanticTokensLegend(tokenTypes)
interface TokenType{
    type: number
    ranges: TokenRange[]
}
interface TokenRange{
    line: number
    index: number
    length: number
}
export class SemanticTokenProvider implements vscode.DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SemanticTokens> {
        const builder = new vscode.SemanticTokensBuilder(legend)
        const tokens = await GetSemanticTokens(document, token)
        if (tokens) {
            tokens.forEach((type: TokenType) => {
                type.ranges.forEach(element => {
                    builder.push(element.line, element.index, element.length, type.type)
                });
            });
        }
        return builder.build()
    }
}