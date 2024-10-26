::该脚本会构建RainLanguage工程中每个项目并自动复制到bin文件夹下
::执行脚本时带上-r参数使用Release配置构建

::设置msbuild路径
set msbuild="C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Current\Bin\MSBuild.exe"

if not exist %msbuild% (
    echo MSBuild.exe not found at %msbuild%
    exit /b 1
)

if "%~1"=="-r" (
    set CONFIG=Release
) else (
    set CONFIG=Debug
)

::构建浮点数版
%msbuild% RainLanguage\RainLanguage\RainLanguage.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG% -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp
%msbuild% RainLanguage\RainDebuggerDetector\RainDebuggerDetector.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG% -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp
%msbuild% RainLanguage\RainLauncher\RainLauncher.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG% -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp

::构建定点数版
%msbuild% RainLanguage\RainLanguage\RainLanguage.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG%Fixed -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp
%msbuild% RainLanguage\RainDebuggerDetector\RainDebuggerDetector.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG%Fixed -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp
%msbuild% RainLanguage\RainLauncher\RainLauncher.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG%Fixed -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp

::构建Injector
%msbuild% RainLanguage\RainDebuggerInjector\RainDebuggerInjector.vcxproj -t:rebuild -verbosity:m -property:Configuration=%CONFIG% -property:Platform=x64 -property:IntermediateOutputPath=..\..\temp\
rmdir /s /q temp

::如果是release，则顺便把RainLanguageServer也构建了
if "%~1"=="-r" (
    %msbuild% RainLanguageServer\RainLanguageServer\RainLanguageServer.csproj -t:rebuild -verbosity:m -property:Configuration=Release -property:Platform=AnyCPU
    npm run build
    npm run package
)