<div align = "center">
# The RainLanguage extension for vscode

[简体中文](./readme.md) | English

![GitHub Release](https://img.shields.io/github/v/release/RainCmd/RainLanguageVSCode)[![GitHub Code License](https://img.shields.io/github/license/RainCmd/RainLanguageVSCode)](LICENSE)[![语言服务仓库](https://img.shields.io/badge/repository-LanguageServer-cyan)](https://github.com/RainCmd/RainLanguageServer)[![LSP协议仓库](https://img.shields.io/badge/LSP-pink)](https://github.com/RainCmd/LanguageServerProtocol)[![雨言介绍](https://img.shields.io/badge/RainLanguage-smoke)](./RainLanguage/readme.md)

</div>

Provide language services and debugging functions for RainLanguage

![预览](./images/preview.png)

### LanguageServer
- Semantically based code highlighting
- Real-time syntax error checking
- Displays reference information for each definition
- Inline prompts for omitted information
- Code completion function
- Function symbol help function
### Running and debugging

- launch

**Click the Add Configuration button in the `.vscode/launch.json` file and select *RainLanguage: 调试运行* to automatically create a configuration template for running the code and debugging (hover over the property name to see what each property does)**

![运行并调试配置模板](./images/launchconfig.png)

- attach

**Click the Add Configuration button in the `.vscode/launch.json` file and select *RainLanguage: 附加到进程* to automatically create a configuration template for attaching to other processes and debugging**

![运行并调试配置模板](./images/attachconfig.png)
