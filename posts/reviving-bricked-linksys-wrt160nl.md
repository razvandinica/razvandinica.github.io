---
title: "Reviving a Bricked Linksys WRT160NL Without a Serial Cable"
date: "2025-09-10"
tags: ["networking", "router", "wrt160nl", "openwrt", "dd-wrt", "unbrick", "tutorial"]
---

It's a moment every hardware tinkerer dreads: the progress bar freezes, the lights stop blinking, and your device becomes an expensive paperweight. I recently faced this scenario after a failed attempt to flash OpenWRT onto my trusty Linksys WRT160NL router.

Fortunately, not all is lost. Many routers have a built-in recovery mode that allows you to upload a new firmware image using a TFTP client. Based on an old, but still relevant, forum post, I was able to bring my router back to life. Here is a step-by-step guide on how you can do the same.

This tutorial was performed on Ubuntu 14.04 LTS, but it should work on any modern Linux distribution with minor adjustments.

### Step 1: Prepare Your Tools

First, you'll need to install a TFTP client on your Linux machine. Open a terminal and run:

```bash
sudo apt-get install tftp
```

Next, download the firmware you want to install. I successfully used DD-WRT's `linksys-to-ddwrt-firmware.bin`, which you can find on their [router database](http://www.dd-wrt.com/site/support/router-database). Alternatively, you can try the latest OpenWRT build or the official firmware from the [Linksys support page](http://support.linksys.com/en-us/support/routers/WRT160NL).

### Step 2: Configure Your Network

This is a critical step. The router's recovery mode will only be accessible from a specific IP address.

1.  Disable your wireless interface.
2.  Connect an Ethernet cable from your computer to the **4th LAN port** on the router.
3.  Manually configure your wired `eth0` interface with the following settings:
    *   **IP Address:** `192.168.1.2`
    *   **Netmask:** `255.255.255.0`
    *   Leave the Gateway and DNS fields blank.

### Step 3: The TFTP Flash

Now for the main event.

1.  Open a terminal and navigate to the folder where you downloaded the firmware (e.g., `cd ~/Downloads`).

2.  Type the following command, but **do not press Enter yet**:
    ```bash
    tftp 192.168.1.1 69
    ```

3.  Power on the router. Watch for the network link light to come on, indicating your computer is connected. As soon as it does, press Enter to run the `tftp` command.

4.  You should now be in the TFTP prompt. Switch to binary mode to ensure the file transfers correctly:
    ```
    binary
    ```

5.  Use the `put` command to upload the firmware file:
    ```
    put linksys-to-ddwrt-firmware.bin
    ```

6.  Once the upload is complete, exit the client:
    ```
    quit
    ```

### Step 4: Victory!

The router will now flash the new firmware. Give it a few minutes to complete the process and reboot. You'll know it's working when you can successfully ping its default address:

```bash
ping 192.168.1.1
```

If you get a reply, you've successfully revived your router! You can now re-enable DHCP on your computer and access the router's web interface to begin configuration.

A huge thank you to "fishball" from the original forum thread for providing the foundation for this guide!
