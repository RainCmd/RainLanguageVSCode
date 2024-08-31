
import * as vscode from 'vscode'
import { GetSemanticTokens } from './LanguageClinet'

//https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide
const tokenTypes =
        ['namespace', 'class', 'enum', 'interface', 'struct', 'typeParameter', 'type', 'parameter', 'variable', 'property',
        'enumMember', 'decorator', 'event', 'function', 'method', 'macro', 'label', 'comment', 'string', 'keyword',
        'number', 'regexp', 'operator']
const tokenModifiers = ['declaration', 'definition', 'readonly', 'static', 'deprecated', 'abstract', 'async', 'modification', 'documentation', 'defaultLibrary']
export const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers)
interface TokenType{
    type: number
    modifier: number
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
                    builder.push(element.line, element.index, element.length, type.type, type.modifier)
                });
            });
        }
        return builder.build()
    }
}