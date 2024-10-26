<div align = "center">
<font size =5>The RainLanguage extension for vscode</font>

[简体中文](./readme.md) | English

![GitHub Release](https://img.shields.io/github/v/release/RainCmd/RainLanguageVSCode)[![GitHub Code License](https://img.shields.io/github/license/RainCmd/RainLanguageVSCode)](LICENSE)[![语言服务仓库](https://img.shields.io/badge/repository-LanguageServer-cyan)](https://github.com/RainCmd/RainLanguageServer)[![LSP协议仓库](https://img.shields.io/badge/LSP-pink)](https://github.com/RainCmd/LanguageServerProtocol)[![RainLanguage介绍](https://img.shields.io/badge/RainLanguage-smoke)](https://github.com/RainCmd/RainLanguage)

</div>

Provide language services and debugging functions for RainLanguage

![预览](./images/preview.png)

### LanguageServer
- Define the jump
- Reference lookup
- Code completion
- Code hovering
- Syntax checking
- Semantic coloring
- Semantic checking
- Inline prompts
- CodeLens
### Running and debugging

- launch

**Click the Add Configuration button in the `.vscode/launch.json` file and select *RainLanguage: 调试运行* to automatically create a configuration template for running the code and debugging (hover over the property name to see what each property does)**

![运行并调试配置模板](./images/launchconfig.png)

- attach

**Click the Add Configuration button in the `.vscode/launch.json` file and select *RainLanguage: 附加到进程* to automatically create a configuration template for attaching to other processes and debugging**

![运行并调试配置模板](./images/attachconfig.png)


## 🙋Introduction to RainLanguage

RainLanguage is a programming language specifically designed for game development with a concise Python-like syntax designed to provide a productive and easy to use development experience. Here are the detailed features of the language:
-Type system: RainLanguage performs type checking at compile time to ensure type safety, while having strong type inference capabilities that reduce the need for explicit type declarations.
- Performance optimization: Support for type declaration of memory allocations on the stack helps reduce garbage collection (GC) pressure, thus achieving better performance than Lua.
- Platform support: Currently RainLanguage supports Windows, Linux, and Android mobile platforms, providing flexibility for multi-platform game development.
- Open Source license: Released under GPLv3.0 to encourage contribution and collaboration from the open source community.
- Game Engine integration: RainLanguage can be used directly within the Unreal Engine and provides a perfect adapter for Unity to integrate it into the two major game engines.

These features make RainLanguage a powerful tool for game developers, especially in projects that require high performance and cross-platform support.