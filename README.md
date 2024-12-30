# Simple SMI extension

This extension shows the current GPU usage in the sidebar. It requires the `nvidia-smi` tool to be present on your system.

### Requirements

This extension requires the `nvidia-smi` tool to be installed and accessible from the command line. `nvidia-smi` is a command-line utility, part of the NVIDIA driver package, that provides monitoring and management capabilities for NVIDIA GPUs.


### Features

This extension displays the current GPU usage in the sidebar. It provides real-time updates and helps you monitor your GPU usage directly within Visual Studio Code. Helpful when you have multiple GPUs in a shared GPU cluster and need to quickly figure out which GPU to use.

![Screen Shot](https://raw.githubusercontent.com/cozek/simple-smi/refs/heads/main/media/snippet.PNG)

### How It Works

The Simple SMI extension is built on top of the Visual Studio Code API and utilizes the `nvidia-smi` command-line tool to fetch GPU usage data. The extension periodically (every 5 seconds) runs the `nvidia-smi` command and parses its output to display the current GPU usage in the sidebar.


## Dev

It uses `node==v20.18.1`. Run `npm install` and using VSCode, then press F5. 
