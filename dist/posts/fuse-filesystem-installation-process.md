## What exactly is FUSE?

Before we get any further let’s clear up one thing FUSE is not the fuse that interrupts the circuit when the current becomes too strong. Now that the pun is out of the way let’s get started.

FUSE or Filesystem in Userspace is a software interface for Unix and Unix-like computer operating systems that lets non-privileged users create their own file systems without editing kernel code<sup>1</sup>.

Allowing secure, non-privileged mounts is one of FUSE’s most significant features. This broadens the scope of filesystem applications. Sshfs<sup>2</sup>, a secure network filesystem that uses the sftp protocol, is an excellent example.

## Premise

This article assumes you already have a filesystem written in Python. Now the next step is to mount it in your system (assuming it’s Unix-like OS). For Windows refer to [WinFsp](https://github.com/winfsp/winfsp). The article was written using Ubuntu 22.04.

## Installing dependencies

To run a FUSE-based filesystem, first, we need to install the FUSE and fusepy modules. The corresponding steps and commands are as follows:

1. Install FUSE: You can install FUSE module on Ubuntu using the following command:

```bash
sudo apt-get install fuse
```

2. Install fusepy: You can install fusepy using pip, the package manager for Python. If pip is not installed, you can install it using the following command:

```bash
sudo apt-get install python3-pip
```

3. Once you have pip installed, you can install fusepy by running the following command:

```bash
pip3 install fusepy
```

## Mounting the file-system

Now that we have installed the dependencies why not mount the filesystem to see what it does! Suppose you have the codes for the filesystem saved in a Python file with a `.py` extension, for example, `examplefs.py`.

1. Run the code: To run the code, open a terminal and navigate to the directory where you saved the code and run the following command:

```bash
python3 entropyfs.py <mountpoint>
```

2. Replace `<mountpoint>` with the directory where you want to mount the file system. This directory must exist before you run the command.

3. For example, if you want to mount the file system to the `~/testfs` directory, run the following command:

```bash
python3 entropyfs.py ~/testfs
```

4. The file system is now mounted, and you can interact with it as you would any other file system.

5. To see the list of all mounted filesystems run the following command

```bash
mount
```

## Unmount the filesystem

To unmount the file system, you can use the `umount` command in the terminal.

1. First, you need to navigate to the directory where you mounted the file system. For example, if you mounted the file system to `~/testfs`, you can navigate to it using the following command:

```bash
cd ~/testfs
```

2. Then, to unmount the file system, run the following command:

```bash
sudo umount <mountpoint>
```

3. Replace `<mountpoint>` with the directory where you mounted the file system. In this example, it would be `~/testfs`.

4. For example, the command to unmount the file system mounted at `~/testfs` would be:

```bash
sudo umount ~/entropyfs
```

After running this command, the file system will be unmounted and you can no longer access it.