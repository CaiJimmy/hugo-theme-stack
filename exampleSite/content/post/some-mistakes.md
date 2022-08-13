+++
aliases = []
author = "Bawali Coder"
categories = []
date = 2022-08-13T18:31:00Z
description = "“Everybody makes mistakes. Everybody has those days.” -  MILEY CYRUS (Miley Stewart - HANNAH MONTANA)"
image = "/uploads/hacker.png"
series = []
tags = ["Application", "Operating System", "Network", "Security", "Linux"]
title = "Some Mistakes"

+++
# Some Mistakes

Security is a journey, not a destination

![](/uploads/scan_virus.jpg)

I am sure you must have seen some videos on how to increase the performance of your linux based systems, but also the security aspect of the "state of the art tweaking" works on the back of your mind. Fear not mein Freund, you just landed to the best possible place to ease out your pain ( I know it hurts).

![](/uploads/basic-layers.png)

## Network Level - Not using a Firewall

![](/uploads/open_port.jpg)

I know I know that managing a firewall can be a humongous task, so normies (shoutout to bugswriter) tend to leave out Firewall from their system.The best packages on Linux you'll come across is \`\`\`ufw\`\`\` and \`\`\`fail2ban\`\`\`. My Arch and RedHat brethren surely know how to install the packages, so only Debian this time😇

### UFW

    sudo apt install ufw

#### Recommended Rules by Homie for ufw

    sudo ufw limit 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw enable

### Fail2Ban

#### Installing Fail2Ban

    sudo apt install fail2ban

#### My Fail2Ban Settings File

Fail2ban is "Prettyyy" useless by itself unless you modify its settings file😈.Here is mine, but feel free to change it to your needs.

All configuration files are in `/etc/fail2ban`

Configuration file examples and defaults are in two main files `/etc/fail2ban/fail2ban.conf` and `/etc/fail2ban/jail.conf`

My Config - `/etc/fail2ban/jail.local`

    [DEFAULT]
    ignoreip = 127.0.0.1/8 ::1
    bantime = 3600
    findtime = 600
    maxretry = 5
    
    [sshd]
    enabled = true

Now in more complex service environments I'll start by adding services and programs like `ssh-jail.conf` to the `/etc/fail2ban/jail.d/` directory. Any program that hackers😈 use is typically always under watch, like WordPress installs for example:

`/etc/fail2ban/jail.d/wordpress.conf`

    [wordpress]
    enabled = true
    filter = wordpress
    logpath = /var/log/auth.log
    maxretry = 3
    port = http,https
    bantime = 300

#### Enabling fail2ban

    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban

## Operating System Level - Adding Repositories

Many a times I have seen peeps installing and using a plethora of repositories on their Linux install.

![](/uploads/mafia-tree.png)

Much similar to Mafia (I was rewatching The Godfather), there is a hierarchy to these repositories and if you just blindly trust and import all the keys to the repositories, these can kill you while you are buying oranges. I’d highly recommend putting a priority on these, so it will only use them when the package doesn’t exist in that base repo.

### Prioritizing Repositories like your brethren

All priority "consigliere" preference files are stored in the `/etc/apt/preferences.d/` directory.

Example: `volian.perf`

    Package: *
    Pin: origin deb.volian.org
    Pin-Priority: 100

* Set specific packages to only install with the `Package: *` Line
* Pin: Origin is the address of the repo
* Pin-Priority is generally 100 which means it will update packages NOT in base repos.
* 1 = do not auto update
* 100 = update if not in other repos
* over 100 = overwrite base repos

Arch doesn’t have any priorities in pacman that I can find, but most are building from source with limited 3rd party repositories. A piece of advice for my "arch"ie friends: building from source presents even more dangers for those that are blindly installing programs through the AUR.

## Application Level - Not using AppArmor or SELinux

![](/uploads/apparmor_vs_selinux.png)

Most Linux distributions have one of these installed by default, but there is a major one that most forget. The Arch Linux. Many install scripts forget to mention AppArmor and SELinux is too complicated to install thanks to its security aspects. A massive security feature is in these that many fail to recognise. They can sandbox and limit program access even when they get elevated. If an application profile doesn’t exist, they typically limit its access to the home folder and limit hardware access.

However, just the simple act of installing these programs often leads to them being used or setup. They typically are set up to be in complain mode for AppArmor or permissive mode for SELinux. Although these are fine for logging and adding some security, it normally would "NOT" stop the "trojan" program from doing damage.

It's nice to be back after ages (although a year😅) blabbering about Linux and Security stuff. Again this is a birthday special post and me posting about my love.

Thanks a lot for reading this and see you soon (hopefully again this year😅). Sayonara