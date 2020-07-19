/*
Written by Albion Fung

A quick and dirty extension to make assignments in Kaplan dark mode.
The super disgusting implementation is due to the spaghettiness of Kaplan web code
as well as indeterminate loading time.

If it doens't work, play around with the await sleep times with the comment "adjust here".
Increase the number until the dark mode starts applying.
*/
'use strict';

console.log("KDM loaded");

// prereq functions
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};

function addStyle() {
    console.log('style set');
    $('iframe').contents().find('frame[name ="testMode"]').contents().find('iframe#sequenceContentFrame').contents().find('head').append(`
    <style id="KDM" type="text/css">
    body {
        background: #1c1e21;
        color: #d6d6d6;
    }
    </style>
    `);
};

async function invertTbl() {
    console.log("Inverting Periodic table");
    // adjust here
    await sleep(30);

    $('iframe').contents().find('frame[name ="testMode"]').contents().find('.periodicTable').contents().find('img').css({
        filter: "invert(0.9)"
    });
    $('iframe').contents().find('frame[name ="testMode"]').contents().find('#dialogPopUp div').css({background: '#1c1e21'});
};

async function checkAndApply() {
    while($('iframe').contents().find('frame[name ="testMode"]').contents().find('iframe#sequenceContentFrame').length === 0) {
        console.log('no iframe testMode');
        await sleep(500);
    }

    // adjust here
    await sleep(0);
    console.log('iframe found');
    console.log('Check and apply');
    $('iframe').contents().find('frame[name ="testMode"]').contents().find('iframe#sequenceContentFrame').contents().find('head').append(`
    <style id="KDM" type="text/css">
    body {
        background: #1c1e21;
        color: #d6d6d6;
    }
    </style>`);
    $('iframe').contents().find('frame[name ="testMode"]').contents().find('body').contents().on('DOMSubtreeModified', addStyle);
    $('iframe').contents().find('frame[name ="testMode"]').contents().find('#imgperiodicTableOhers').parent().on('click',invertTbl);
};

async function landing() {

    $('body').css({ background: "#1c1e21" });

    while($('iframe').length === 0) {
        await(sleep(500));
    }
    $('iframe').contents().find('body').css({ background: "#1c1e21" });

    while($('iframe').contents().find('frame[name ="main"]').length === 0
    || $('iframe').contents().find('frame[name ="main"]').contents().find('#navigationTbl td') === 0) {
        console.log('no iframe main');
        await sleep(500);
    }

    $('iframe').contents().find('body').contents().find('frame[name ="main"]').contents().css({ background: "#1c1e21" });

    // adjust here
    await sleep(1200);

    console.log("applying to landing");
    $('iframe').contents().find('frame[name ="main"]').contents().find('body').css({
        background: "#1c1e21",
        color: "#d6d6d6"
    });
    $('iframe').contents().find('frame[name ="main"]').contents().find('#navigationTbl td').css({ background: "#1c1e21"});
    $('iframe').contents().find('frame[name ="main"]').contents().find('#navigationTbl').css({
        background: "#1c1e21", color: "#d6d6d6"
    });
    $('iframe').contents().find('frame[name ="main"]').contents().find('#headerTbl').css({
        background: "#1c1e21", color: "#d6d6d6"
    });
    $('iframe').contents().find('frame[name ="main"]').contents().find('#default-section').css({
        background: "#1c1e21", color: "#d6d6d6"
    });
    $('iframe').contents().find('frame[name ="main"]').contents().find('#default-section p').css({
        color: "#d6d6d6"
    });
    $('iframe').contents().find('frame[name ="main"]').contents().find('#default-section p span').css({
        color: "#d6d6d6"
    });
};

landing();
checkAndApply();