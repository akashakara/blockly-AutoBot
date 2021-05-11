$(document).ready(function() {
    $("#runBtn").click(function() {
        runcode();
    });
    $("#resetBtn").click(function() {
        reset();
    });
});

Blockly.Blocks['statement'] = {
    init: function() {
        this.appendStatementInput("Bot")
            .setCheck(null)
            .appendField("Bot");
        this.setColour(100);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['dropdown_menu'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Ask me a question")
            .appendField(new Blockly.FieldDropdown([
                ["What is the date today?", "a"],
                ["What is the time now?", "b"],
                ["How are you?", "c"],
                ["What is JavaScript?", "d"],
                ["What is your name?", "e"]
            ]), "Ask me a Question");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['statement'] = function(block) {
    text_inp = "";
    code = '';
    var statements_bot = Blockly.JavaScript.statementToCode(block, 'Bot');
    code += statements_bot;
    console.log(statements_bot);
    return code;
};

Blockly.JavaScript['dropdown_menu'] = function(block) {

    var dropdown_ques = block.getFieldValue('Ask me a Question');
    return intiateBot(dropdown_ques);
};

function intiateBot(dropdown_ques) {
    let code = "";
    if (dropdown_ques === "a") {
        code = `text_inp += "Today is: " + new Date().toLocaleDateString();`
    } else if (dropdown_ques === "b") {
        code = `text_inp += "The time is: " + new Date().toLocaleTimeString();`
    } else if (dropdown_ques === "c") {
        code = `text_inp += "I am good";`
    } else if (dropdown_ques === "d") {
        code = `text_inp += "JavaScript is a scripting language to make websites";`
    } else if (dropdown_ques === "e") {
        code = `text_inp += "I am a blockly Bot.";`
    }
    code += `\ntext_inp += "<br><br>";\n`
    return code;
}

var workspace = Blockly.inject("blocklyDiv", {
    media: "assets/media/",
    toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
    if (typeof text_inp !== "undefined") {
        $("#inputBox").html(text_inp);
    } else {
        $("#inputBox").html("");
    }
}

function runcode() {
    try {
        code = '';
        eval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
        console.error(e);
    }
    redrawUi();
}

function reset() {
    delete inputTextValue;
    delete text_inp;
    redrawUi();
    Blockly.mainWorkspace.clear();
}
//The eval() function evaluates or executes an argument. If the argument is an expression, eval() evaluates the expression