"use strict";

var main = (function () {
    /**
     * CONFIGS
     */
    var configs = (function () {
        var instance;
        var Singleton = function (options) {
            var options = options || Singleton.defaultOptions;
            for (var key in Singleton.defaultOptions) {
                this[key] = options[key] || Singleton.defaultOptions[key];
            }
        };
        Singleton.defaultOptions = {
            general_help: "Below is a list of helpful commands to begin navigating the database.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities. \nIn order to skip text rolling, double click anywhere.",
            list_help: "Lists any files currently stored on the database.",
            retrieve_help: "Read FILE(s) content and print it to the standard output (screen).",
            whoami_help: "Print the user name associated with the current effective user ID and more info.",
            dates_help: "A list of entry dates. To access entries, use retrieve command on the correct file. ",
            help_help: "Print this menu.",
            clear_help: "Clear the terminal screen.",
            reboot_help: "Reboot the system.",
            mv_help: "Move (rename) files.",
            rm_help: "Remove files or directories.",
            sudo_help: "Execute a command as the superuser.",
		welcome: "Processing log in details:~ \n. \n.. \n... \n.... \nLogin  =  SUCCESSFUL \n \n \n \nAcquiring database link........ LINKED \nCommencing packet download:~ \n{ \n1% \n4% \n23% \n58% \n90% \n93% \n97% \n99% \n100% \n} \n \n \n \nDecrypting packet seed {DWORD_com.pro$}_Run} \nDWORD find_start_seed (wchar_t *uid, wchar_t, DWORD init_seed) \n{ \nDWORD seed = init_seed; \nDWORD uid_seed = 6; \nDWORD ext_see = 3; \n//printf (u: %#x\n, init_seed); \nif (uid) { \n uid_seed = find_uid_seed(uid, seed, false); \nprintf (u:%#x\n, uid_seed); \n} \nif (!ext) return uid_seed; \n \nif (uid) { \next_seed = find_uid_seed(ext, uid_seed, TRUE); \n} else { \next_seed = find_uid_seed(ext, seed, false); \n} \nif (uid && ext_seed - uid_seed > 100) { \nenable ([ACCESS] Permissions granted!/n); \n} \n \n \n \nDataFlight [Version 10.0.17134.165] \nCaptains Logbook Database Status \n DECRYPTION......DONE \nLOADING......DONE \n Commence welcome_prompt/c*starup \n \n \n \n \n \n_____ Captains Log Database _____\nWelcome back Captain E. Rogers \nWe here at DataFlight hope you're having a wonderful day. \nShould you encounter any issues with the logbook or data storage systems, please contact the provided email: \ndataflight@support.com \nExecute the 'help' command to see a list of avaible commands.",
            internet_explorer_warning: "NOTE: I see you're using internet explorer, this website won't work properly.",
            welcome_file_name: "boot_recording (debugging purposes)",
            invalid_command_message: "<value>: command not found.",
            reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
            permission_denied_message: "Unable to '<value>', permission denied.",
            sudo_message: "Unable to sudo using a web client.",
            usage: "Usage",
            file: "file",
            file_not_found: "File '<value>' not found.",
            username: "Username",
            hostname: "Host",
            platform: "Platform",
            accesible_cores: "Accessible cores",
            language: "Language",
            value_token: "<value>",
            host: "Rogers",
            user: "Captain E. ",
            is_root: false,
            type_delay: 25
        };
        return {
            getInstance: function (options) {
                instance === void 0 && (instance = new Singleton(options));
                return instance;
            }
        };
    })();
    var files = (function () {
        var instance;
        var Singleton = function (options) {
            var options = options || Singleton.defaultOptions;
            for (var key in Singleton.defaultOptions) {
                this[key] = options[key] || Singleton.defaultOptions[key];
            }
        };
        Singleton.defaultOptions = {
            "about": "This website was made using only pure JavaScript with no extra libraries.\nI made it dynamic so anyone can use it, just download it from GitHub and change the config text according to your needs.\nIf you manage to find any bugs or security issues feel free to email me: luisbraganca@protonmail.com",
            "contact": "dataflight@support.com",
			"nov2083": "Captain's Log \nFriday 22nd, November, 2083 \n \nAfter having been taken over by an android, the Enterprise has been under way at warp seven for four days. Now we are entering orbit around a planet which has never been charted. (TOS: I, Mudd) \n \n************************************ \n \nCaptain's Log \n Wednesday 27th, November, 2083 \n \nDeep Space Station K-7 has issued a priority one call. More than an emergency, it signals near or total disaster. We can only assume the Klingons have attacked the station. We're going in armed for battle."
        };
        return {
            getInstance: function (options) {
                instance === void 0 && (instance = new Singleton(options));
                return instance;
            }
        };
    })();

    /**
     * AUX FUNCTIONS
     */

    var isUsingIE = (function () {
        return function () {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
        }
    })();

    var ignoreEvent = (function () {
        return function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
    })();

    var scrollToBottom = (function () {
        return function () {
            window.scrollTo(0, document.body.scrollHeight);
        }
    })();

    var isPhone = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);


    /**
     * MODEL
     */

    var InvalidArgumentException = function (message) {
        this.message = message;
        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, InvalidArgumentException);
        } else {
            this.stack = (new Error()).stack;
        }
    };
    // Extends Error
    InvalidArgumentException.prototype = Object.create(Error.prototype);
    InvalidArgumentException.prototype.name = "InvalidArgumentException";
    InvalidArgumentException.prototype.constructor = InvalidArgumentException;

    var cmds = {
        HELP: { value: "help", help: configs.getInstance().help_help },
		DATES: { value: "dates", help: configs.getInstance().dates_help },
		RETRIEVE: { value: "retrieve", help: configs.getInstance().retrieve_help },
		LIST: { value: "list", help: configs.getInstance().list_help },
        CLEAR: { value: "clear", help: configs.getInstance().clear_help },
        REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
        WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
        MV: { value: "mv", help: configs.getInstance().mv_help },
        RM: { value: "rm", help: configs.getInstance().rm_help },
        SUDO: { value: "sudo", help: configs.getInstance().sudo_help }
    };


    var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
        if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
        }
        if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
            throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
        }
        if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        if (!(sidenav instanceof Node) || sidenav.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + sidenav + " for argument 'sidenav'.");
        }
        if (!(profilePic instanceof Node) || profilePic.nodeName.toUpperCase() !== "IMG") {
            throw new InvalidArgumentException("Invalid value " + profilePic + " for argument 'profilePic'.");
        }
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + host + ":~");
        this.profilePic = profilePic;
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.sidenav = sidenav;
        this.sidenavOpen = false;
        this.sidenavElements = [];
        this.typeSimulator = new TypeSimulator(outputTimer, output);
    };

    Terminal.prototype.type = function (text, callback) {
        this.typeSimulator.type(text, callback);
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        isPhone && (document.getElementById("githubImg").style.display = "none");
        this.sidenav.addEventListener("click", ignoreEvent);
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
        this.prepareSideNav();
        this.lock(); // Need to lock here since the sidenav elements were just added
        document.body.addEventListener("click", this.focus.bind(this));
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };



    Terminal.makeElementDisappear = function (element) {
        element.style.opacity = 0;
        element.style.transform = "translateX(-300px)";
        // Support for old browsers
        element.style.msTransform = "translateX(-300px)";
        element.style.WebkitTransform = "translateX(-300px)";
    };

    Terminal.makeElementAppear = function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateX(0)";
        // Support for old browsers
        element.style.msTransform = "translateX(0)";
        element.style.WebkitTransform = "translateX(0)";
    };

    Terminal.prototype.prepareSideNav = function () {
        var capFirst = (function () {
            return function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        })();
        for (var file in files.getInstance()) {
            var element = document.createElement("button");
            Terminal.makeElementDisappear(element);
            element.onclick = function (file, event) {
                this.handleSidenav(event);
                this.cmdLine.value = "retrieve " + file + " ";
                this.handleCmd();
            }.bind(this, file);
            element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
            this.sidenav.appendChild(element);
            this.sidenavElements.push(element);
        }
        // Shouldn't use document.getElementById but Terminal is already using loads of params
        document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
    };

    Terminal.prototype.handleSidenav = function (event) {
        if (this.sidenavOpen) {
            this.profilePic.style.opacity = 0;
            this.sidenavElements.forEach(Terminal.makeElementDisappear);
            this.sidenav.style.width = "50px";
            document.getElementById("sidenavBtn").innerHTML = "&#9776;";
            this.sidenavOpen = false;
        } else {
            this.sidenav.style.width = "300px";
            this.sidenavElements.forEach(Terminal.makeElementAppear);
            document.getElementById("sidenavBtn").innerHTML = "&times;";
            this.profilePic.style.opacity = 1;
            this.sidenavOpen = true;
        }
        document.getElementById("sidenavBtn").blur();
        ignoreEvent(event);
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
    };

    Terminal.prototype.unlock = function () {
        this.cmdLine.disabled = false;
        this.prompt.textContent = this.completePrompt;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = false;
        });
        scrollToBottom();
        if (!isPhone) {
            this.focus();
        }
    };

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.RETRIEVE.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.RETRIEVE.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                if (configs.getInstance().welcome_file_name.startsWith(cmdComponents[1].toLowerCase())) {
                    possibilities.push(cmds.RETRIEVE.value + " " + configs.getInstance().welcome_file_name);
                }
                for (var file in files.getInstance()) {
                    if (file.startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.RETRIEVE.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

//Is used by the command functions below to reference the command inputs above
    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case cmds.RETRIEVE.value:
                this.retrieve(cmdComponents);
                break;
            case cmds.LIST.value:
                this.list();
                break;
            case cmds.WHOAMI.value:
                this.whoami();
                break;
            case cmds.DATES.value:
                this.dates();
                break;
            case cmds.HELP.value:
                this.help();
                break;
            case cmds.CLEAR.value:
                this.clear();
                break;
            case cmds.REBOOT.value:
                this.reboot();
                break;
            case cmds.MV.value:
            case cmds.RM.value:
            case cmds.SUDO.value:
                this.sudo();
                break;
            default:
                this.invalidCommand(cmdComponents);
                break;
        };
    };

    Terminal.prototype.retrieve = function (cmdComponents) {
        var result;
        if (cmdComponents.length <= 1) {
            result = configs.getInstance().usage + ": " + cmds.RETRIEVE.value + " <" + configs.getInstance().file + ">";
        } else if (!cmdComponents[1] || (!cmdComponents[1] === configs.getInstance().welcome_file_name && !files.getInstance().hasOwnProperty(cmdComponents[1]))) {
            result = configs.getInstance().file_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
        } else {
            result = cmdComponents[1] === configs.getInstance().welcome_file_name ? configs.getInstance().welcome : files.getInstance()[cmdComponents[1]];
        }
        this.type(result, this.unlock.bind(this));
    };

	//Below Determines the command function
    Terminal.prototype.list = function () {
        var result = ".\n..\n" + configs.getInstance().welcome_file_name + "\n";
        for (var file in files.getInstance()) {
            result += file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    }

    Terminal.prototype.whoami = function (cmdComponents) {
        var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.dates = function (cmdComponents) {
        this.type(("November, 2083, Entries 5\n December, 2083, Entries 2\n January, 2084, Entries 3\n February, 2084, Entries 1\n March, 2084, Entries 3"), this.unlock.bind(this));
    };
	
    Terminal.prototype.help = function () {
        var result = configs.getInstance().general_help + "\n\n";
        for (var cmd in cmds) {
            result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.clear = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        this.prompt.textContent = this.completePrompt;
        this.unlock();
    };

    Terminal.prototype.reboot = function () {
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(configs.getInstance().welcome + (isUsingIE() ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
                this.unlock();
            }.bind(this));
        }
    };

    Terminal.prototype.permissionDenied = function (cmdComponents) {
        this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.focus = function () {
        this.cmdLine.focus();
    };

    var TypeSimulator = function (timer, output) {
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        var isURL = (function () {
            return function (str) {
                return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
            };
        })();
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var output = this.output;
        var timer = this.timer;
        var skipped = false;
        var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                var isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                i++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer * 2 : timer);
                } else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                document.getElementById("sidenav"),
                document.getElementById("profilePic"),
                configs.getInstance().user,
                configs.getInstance().host,
                configs.getInstance().is_root,
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;