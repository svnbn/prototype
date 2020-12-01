/* ******************************************************************
 * Die JavaScript-Magic ...
 * ****************************************************************** */

/*
 * Für sanftes Scrollen muss das CSS-Attribut
 * `scroll-behaviour` gesetzt sein:
 *
 *     html {
 *       scroll-behavior: smooth;
 *     }
 *
 * (siehe: `assets/css/style.css`)
 */

let timeout;    // Interval-Handler (jQuery).
let dy  = 25;   // Scroll-Offset [Pixel].
let dt  = 10;   // Scroll-Verzögerung [ms].

let viewportElements = 'main > p';

/* ****************************************************************** */
/* jQuery-Event-Handler der Scroll-Buttons. */

/* Nach oben scrollen bei MouseDown-Event. */
$('#scroll-up').bind('mousedown touchstart', function() {
    timeout = setInterval(function() {
        window.scrollBy(0, -dy);
    }, dt);

    return false;
});

/* Nach unten scrollen bei MouseDown-Event. */
$('#scroll-down').bind('mousedown touchstart', function() {
    timeout = setInterval(function() {
        window.scrollBy(0, dy);
    }, dt);

    return false;
});

/* Scrolling beenden bei MouseUp-Event. */
$(document).bind('mouseup touchend', function() {
    clearInterval(timeout);
    return false;
});

/* ****************************************************************** */
/* Doppel-Klick. */

$('#scroll-up').dblclick(function() {
    let $els = $(viewportElements);             // Array der Absätze.
    let idx  = firstVisible(viewportElements);  // Index des ersten sichbaren Absatzes.

    if ((idx < 1) || (idx > $els.length))
        return false;

    console.log('Index: ' + idx);
	$('body').scrollTo($els[idx - 1]);

    return false;
});

$('#scroll-down').dblclick(function() {
    let $els = $(viewportElements);             // Array der Absätze.
    let idx  = firstVisible(viewportElements);  // Index des ersten sichbaren Absatzes.

    if ((idx < 0) || (idx >= $els.length))
        return false;

    console.log('Index: ' + idx);
	
	$('body').scrollTo($els[idx]);

    return false;
});

/* ****************************************************************** */

/* Gibt den Index des ersten sichtbaren Elements in `container`
 * zurück. */

function firstVisible(container) {
    let idx    = -1; // Index
    let scroll = $(window).scrollTop();
    let $els   = $(container);
    let $el;

    for (let i = 0; i < $els.length; i++)
    {
        $el = $($els[i]);

        if ($el.offset().top >= scroll && $el.is(':visible')) {
            idx = i;
            break;
        }
    }

    if (idx === -1)
        idx = $els.length - 1;

    return idx;
}

/* ****************************************************************** */

/* Anonyme Funktion mit jQuery ausführen,
 * sobald das DOM geladen ist.
 * */

$(document).ready(function() {
    console.log('Web App started');
});

/* ****************************************************************** */
