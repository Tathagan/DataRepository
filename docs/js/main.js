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
		welcome: "Processing log in details:~ \n. \n.. \n... \n.... \nLogin  =  SUCCESSFUL \n \n \n \nAcquiring database link........ LINKED \nCommencing packet download:~ \n{ \n1% \n4% \n23% \n58% \n90% \n93% \n97% \n99% \n100% \n} \n \n \n \nDecrypting packet seed {DWORD_com.pro$}_Run} \nDWORD find_start_seed (wchar_t *uid, wchar_t, DWORD init_seed) \n{ \nDWORD seed = init_seed; \nDWORD uid_seed = 6; \nDWORD ext_see = 3; \n//printf (u: %#x/n, init_seed); \nif (uid) { \n uid_seed = find_uid_seed(uid, seed, false); \nprintf (u:%#x/n, uid_seed); \n} \nif (!ext) return uid_seed; \n \nif (uid) { \next_seed = find_uid_seed(ext, uid_seed, TRUE); \n} else { \next_seed = find_uid_seed(ext, seed, false); \n} \nif (uid && ext_seed - uid_seed > 100) { \nenable ([ACCESS] Permissions granted!/n); \n} \n \n \n \nDataFlight [Version 10.0.17134.165] \nCaptains Logbook Database Status \n DECRYPTION......DONE \nLOADING......DONE \n Commence welcome_prompt/c*starup \n \n \n \n \n \n_____ Captain's Log Database _____\nWelcome back Captain E. Rogers \nWe here at DataFlight hope you're having a wonderful day. \nShould you encounter any issues with the logbook or data storage systems, please contact the provided email: \ndataflight@support.com \nExecute the 'help' command to see a list of avaible commands.",
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
            "support": "dataflight@support.com",
			"\n": "",
			"feb_2499": "Captain's Log \nWednesday 12th, February, 2499 \n \nCalm weather this day, a nice change of pace from the storm 2 nights ago. Still recovering from the damages. Set engineering to fixing the power converters. \n \n************************************ \n \nCaptain's Log \nSunday 16th, February, 2499 \n \nTurns out the power converters are more badly damaged that originally thought. Engineering suggests disabling all inessential systems to reduce strain until repairs are done. The residents won’t be happy about this, but when are they ever. \n \n************************************ \n \nCaptain's Log \nSunday 23rd, February, 2499 \n \nPower converters finally fixed, hopefully this will get the residents off my back. Overcast weather, smell of rain in the air. Hoping another storm isn’t on its way, not sure how well the ship will take to it after its recent beating.",
			"mar_2499": "Captain's Log \nSunday 8th, March, 2499 \n \nMade contact with a nearby vessel today. Always nice to talk to other captains, very rare to hear new voices out here. Calm weather, nothing else noteworthy. \n \n************************************ \n \nCaptain's Log \nThursday 19th, March, 2499 \n \nRadar was seen to be picking up 3 entities following the ship today. Most likely a pod of whales or dolphins, but naturally some of the crew like to make up stories between themselves. All systems functional and maintained and also relatively good growth on the plants especially for this time of year. \n \n************************************ \n \nCaptain's Log \nWednesday 25th, March, 2499 \n \nInterestingly, the radar is still showing there to be 3 entities following the ship. I’ve not seen a pod of whales follow a ship for this long before, come to think of it I haven’t seen any whales in a long time. Would be nice if they decided to surface, be a good moral boost for the whole ship to see something so majestic as a whale. \n",
			"apr_2499": "Captain's Log \nDATA UNAVAILABLE (possible corruption). Contact us at dataflight@support.com to try and resolve this issue. \n \n************************************ \n \nCaptain's Log \nDATA UNAVAILABLE (possible corruption). Contact us at dataflight@support.com to try and resolve this issue. \n \n************************************ \n \nCaptain's Log \nDATA UNAVAILABLE (possible corruption). Contact us at dataflight@support.com to try and resolve this issue. \n",
			"may_2499": "Captain's Log \nMonday 11th, May, 2499 \n \nAnother ‘sighting’ today. Similarly to the sightings last month, the resident can’t describe any discernable features of what they saw. Interestingly, our radars never informed us of anything entering close proximity to the ship. Most likely another resident who is letting the vast expanse of the ocean get to his head. \n \n************************************ \n \nCaptain's Log \nSaturday 23rd, May, 2499 \n \nA strange occurrence happened today. Roughly around 3am, I awoke to the ship being rocked. I checked in with the first mate and there was reportedly no sign of what caused the disturbance. Perhaps there is merit to these sightings after all. \n",
			"jun_2499": "Captain's Log \nFriday 12th, June, 2499 \n \nDuring the routine maintenance sweep today, a crew member found a small puncture in the hull of the ship. I can’t for the life of me find a reasonable explanation for such damage to occur. Surely I’m not becoming as paranoid as some of the residents. Regardless, we have since repaired the damage and I’ve now upped the number of maintenance sweeps, can never be to safe. \n \n************************************ \n \nCaptain's Log \nSaturday 27rd, June, 2499 \n \nI’ve not been sleeping well, the sound of the hull creaking once comforted me but now, well not it worries me. I can’t stop thinking about all the strange occurrences over the past months, surely there is some reasonable explanation. Right? \nThere have been more signs of damage slowly popping up around the ship. I’ve put the crew on high alert and that they’re to report to me the moment anything happens. Perhaps I’m finally going mad out here on these oceans, or perhaps my concerns are rightfully placed, I’m unsure what is worse. \n",
			"jul_2499": "Captain's Log \nSunday 26th, July, 2499 \n \nIt’s quite, too damn quite. Not a single fish caught in days. No new damage, sightings or other strange anomalies. It feels like the eye of a storm, peaceful until the full force of the storm bears down upon you in an instant. I want to believe I’m wrong but I can’t shake the feeling that something is going to happen. Dear god let me be wrong. \n",
			"aug_2499": "Captain's Log \nMonday 3rd, August, 2499 \n \nI write in haste as there is much to do but I must document these events as I feel they will someday be important for others. Monitoring the radars overnight has shown us that a large gathering is forming surrounding our ship. As of now it is not shown hostile intent, but I can only imagine what is in store for us. I feel we are up against something far greater than we expected, perhaps it’s mother natures cruel way of telling us we weren’t meant to survive the flood that consumed the world. As I write this, I’m scanning some of my entries into the dataflight repository should this be my final entry. Hopefully my writings will make it to other ships and serve as a warning of the new threat that hides below the waves. \n"
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
        document.getElementById("sidenavBtn").addEventListener("", this.handleSidenav.bind(this));
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
        this.type(("-ARCHIVED FILES- \nJune, 2498, Entries 4 \nJuly, 2498, Entries 5 \nAugust, 2498, Entries 3 \nSeptember, 2498, Entries 4 \nOctober, 2498, Entries 6 \nNovember, 2498, Entries 4 \n December, 2498, Entries 6\n January, 2499, Entries 3 \nTo regain access to any archived file, please contact DataFlight on the provided support email (use command 'retrieve support' to see email address). \n \n \n \n-ACCESSIBLE FILES- \nFebruary, 2499, Entries 3 \n March, 2499, Entries 3 \nApril, 2499, Entries 4 \nMay, 2499, Entries 2 \nJune, 2499, Entries 2 \nJuly, 2499, Entries 1 \nAugust, 2499, Entries 1"), this.unlock.bind(this));
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