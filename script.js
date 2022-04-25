"use strict";

async function playAudio(audio = new Audio()) {
    if (typeof audio === "string") {
        const audioFile = new Audio(samplesPath + audio);
        await audioFile.play();
        audioFile.classList.add("audio");
        document.querySelector(".slider").insertAdjacentElement("afterend", audioFile);
    } else {
        audio.play();
    }
}

function enableElement(element) {
    element.classList.remove("disable");
    element.classList.add("active");
}

function disableElement(element) {
    element.classList.remove("active");
    element.classList.add("disable");
}

function nextSlide(currSlide = { count: 0 }) {
    const slides = document.querySelectorAll(".slide");
    if (currSlide.count + 1 >= slides.length) {
        return;
    }
    disableElement(slides[currSlide.count]);
    // transition time is equal to timeout time
    (() => {
        const slide = slides[currSlide.count];
        setTimeout(() => {
            slide.innerHTML = "";
        }, 300);
    })();
    currSlide.count++;
    enableElement(slides[currSlide.count]);
    // window.onkeydown = function() {}
    slides[currSlide.count].innerHTML = slidesNodes[currSlide.count];
    slidesLogic[currSlide.count]();
    // const slideLogic = slidesLogicManager.getLogic()[currSlide.count];
    // if (slideLogic) slideLogic();
    // else globalKeyHandler();
}

function prevSlide(currSlide = { count: 0 }) {
    const slides = document.querySelectorAll(".slide");
    if (currSlide.count - 1 < 0) {
        return;
    }
    disableElement(slides[currSlide.count]);
    (() => {
        const slide = slides[currSlide.count];
        setTimeout(() => {
            slide.innerHTML = "";
        }, 300);
    })();
    currSlide.count--;
    enableElement(slides[currSlide.count]);
    // window.onkeydown = function() {}
    slides[currSlide.count].innerHTML = slidesNodes[currSlide.count];
    slidesLogic[currSlide.count]();
    // const slideLogic = slidesLogicManager.getLogic()[currSlide.count];
    // if (slideLogic) slideLogic();
    // else globalKeyHandler();
}

let currentSlide = {
    count: 0
};
const slides = document.querySelectorAll(".slide");
const slidesNodes = [];
const slidesLogic = [];
const samplesPath = "./samples/";
const beatPath = "beats/";
const wavExt = ".wav";
// it's recommended to use file less than 50 kbytes. Otherwise sound loads too much long
const hhFileName = "pbs - gucci gang [ Hihat ]" + wavExt;
const clap1FileName = "pbs - basic [ Clap ]" + wavExt;
const clap2FileName = "pbs - official atl[ Clap ]" + wavExt;
const ohFileName = "pbs - 808 mafia 1.0 [ OpHat ]" + wavExt;
const oh2FileName = "pbs - real trap [ OpHat ]" + wavExt;
const snareFileName = "pbs - 808 mafia 2.0 [ Snare ]" + wavExt;
const snare2FileName = "pbs - flip [ Snare ]" + wavExt;
const insaneDrillFileName = "insane_drill_150bpm" + wavExt;
const imbaBellsFileName = "imba_bells_140bpm" + wavExt;

slides.forEach(slide => {
    slidesNodes.push(slide.innerHTML);
    slide.innerHTML = "";
});
slides[0].innerHTML = slidesNodes[0];

// function globalKeyHandler() {
//     window.onkeydown = function(e) {
//         if (e.key === "ArrowRight") {
//             nextSlide(currentSlide);
//         } else if (e.key === "ArrowLeft") {
//             prevSlide(currentSlide);
//         }
//     }
// }
// globalKeyHandler();
window.onkeydown = function(e) {
    if (e.key === "ArrowRight") {
        nextSlide(currentSlide);
    } else if (e.key === "ArrowLeft") {
        prevSlide(currentSlide);
    }
}

// class SliderLogic {
//     // private
//     slideLogic;
//     constructor() {
//         this.slideLogic = [];
//     }
//     addLogic(func, i) {
//         i--;
//         this.slideLogic[i] = func;
//     }
//     getLogic() {
//         return this.slideLogic;
//     }
// }

function slideHomeLogic() {
    const titleItems = document.querySelectorAll(".main-title .main-title-item");
    titleItems.forEach((item, i) => {
        setTimeout(() => {
            enableElement(item);
        }, 100 * i);
    });
    slidesLogic.push(slideHomeLogic);
}
function beatmakingDefinitionLogic() {
    slidesLogic.push(beatmakingDefinitionLogic);
}
function melodyDefLogic() {

}
function drumsDefLogic() {
    
}
function slideExamplesLogic() {
    window.onkeydown = function(e) {
        // alt and shift are like conventionally for drums
        // ctrl key is for beats
        // why idk lol
        console.log(e.key);
        if (e.key === "ArrowRight") {
            nextSlide(currentSlide);
        } else if (e.key === "ArrowLeft") {
            prevSlide(currentSlide);
        }
        else if (e.shiftKey && e.key === "S") {
            const allAudios = document.querySelectorAll(".audio");
            allAudios.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
        else if (e.shiftKey && e.key === "B") {
            playAudio(beatPath + imbaBellsFileName);
        } else if (e.shiftKey && e.key === "I") {
            playAudio(beatPath + insaneDrillFileName);
        } else if (e.altKey && e.key === "o") {
            playAudio(oh2FileName);
        } else if (e.altKey && e.key === "c") {
            playAudio(snare2FileName);
        } else if (e.key === "h") {
            playAudio(hhFileName);
        } else if (e.key === "c") {
            playAudio(clap1FileName);
        } else if (e.key === "o") {
            playAudio(ohFileName);
        } else if (e.key === "s") {
            playAudio(snareFileName);
        }
    }
}
function starBeatmakersLogic() {

}
function JuiceWrldSlideLogic() {

}
function conclusionSlideLogic() {

}

slideHomeLogic();
beatmakingDefinitionLogic();
melodyDefLogic();
drumsDefLogic();
slideExamplesLogic();
starBeatmakersLogic();
JuiceWrldSlideLogic();
conclusionSlideLogic();

// const slidesLogicManager = new SliderLogic();
// // home slide is the first
// slidesLogicManager.addLogic(slideHomeLogic, 1);
// slidesLogicManager.addLogic(beatmakingDefinitionLogic, 2);
// slidesLogicManager.addLogic(melodyDefLogic, 3);
// slidesLogicManager.addLogic(drumsDefLogic, 4);
// // examples of drums is fifth
// slidesLogicManager.addLogic(slideExamplesLogic, 5);
// slidesLogicManager.addLogic(starBeatmakersLogic, 6);
// slidesLogicManager.addLogic(JuiceWrldSlideLogic, 7);
// slidesLogicManager.addLogic(conclusionSlideLogic, 8);
