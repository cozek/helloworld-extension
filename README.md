# Simple SMI README

This is the README for your extension "Simple SMI". This extension shows the current GPU usage in the sidebar. It requires the `nvidia-smi` tool to be present on your system.

## Features

This extension displays the current GPU usage in the sidebar. It provides real-time updates and helps you monitor your GPU performance directly within Visual Studio Code.

\!\[GPU Usage\]\(./media/gpu-usage.png\)

## How It Works

The Simple SMI extension is built on top of the Visual Studio Code API and utilizes the `nvidia-smi` command-line tool to fetch GPU usage data. The extension periodically runs the `nvidia-smi` command and parses its output to display the current GPU usage in the sidebar.

## Requirements

This extension requires the `nvidia-smi` tool to be installed and accessible from the command line. `nvidia-smi` is a command-line utility, part of the NVIDIA driver package, that provides monitoring and management capabilities for NVIDIA GPUs.


### 1.0.0

Initial release of Simple SMI.


## Dev

It uses `node==v20.18.1`. Run `npm install` and using VSCode, then press F5. 