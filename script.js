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
    if (element) {
        element.classList.remove("disable");
        element.classList.add("active");
    }
}

function disableElement(element) {
    if (element) {
        element.classList.remove("active");
        element.classList.add("disable");
    }
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
    slides[currSlide.count].innerHTML = slidesNodes[currSlide.count];
    slidesLogic[currSlide.count]();
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
    slides[currSlide.count].innerHTML = slidesNodes[currSlide.count];
    slidesLogic[currSlide.count]();
}

class QuerySelectorManager {
    static createQuerySelector(mainSelector = "") {
        mainSelector += " ";
        return function(selector = "", options = { all: false }) {
            const { all } = options;
            selector = mainSelector + selector;
            return (
                all
                    ? document.querySelectorAll(selector)
                    : document.querySelector(selector)
            )
        }
    }
}

const currentSlide = {
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
const snare2FileName = "pbs - zaytoven trunk [ Snare ]" + wavExt;
const first808 = "pbs - zaytoven soundcloud [ 808 ]" + wavExt;
const second808 = "VELLDAX 808 5 (wav)" + wavExt;
const insaneDrillFileName = "insane_drill_150bpm" + wavExt;
const imbaBellsFileName = "imba_bells_140bpm" + wavExt;

slides.forEach(slide => {
    slidesNodes.push(slide.innerHTML);
    slide.innerHTML = "";
});
slides[0].innerHTML = slidesNodes[0];

window.onkeydown = function(e) {
    if (e.key === "ArrowRight") {
        nextSlide(currentSlide);
    } else if (e.key === "ArrowLeft") {
        prevSlide(currentSlide);
    }
}

function slideHomeLogic() {
    const title = document.querySelector(".main-title");
    const titleContent = title.textContent.split("");
    title.innerHTML = "";
    titleContent.forEach(item => {
        title.innerHTML += `<span class="main-title-item">${item}</span>`;
    });
    const titleItems = document.querySelectorAll(".main-title .main-title-item");
    const titleItemsDuration = 100 * titleItems.length;
    const beatmakingProsDuration = titleItemsDuration + 300 + 300;
    titleItems.forEach((item, i) => {
        setTimeout(() => {
            enableElement(item);
        }, 100 * i);
    });
    const mainInfoTitle = document.querySelector(".main-info .main-info-title");
    const mainInfoInf = document.querySelector(".main-info .main-info-inf");
    setTimeout(() => {
        enableElement(mainInfoTitle);
        // just independing time duration
        setTimeout(() => {
            enableElement(mainInfoInf);
        }, 150);
    }, titleItemsDuration);
    const beatmakingProsTitle = document.querySelector(".beatmaking-pros .beatmaking-pros-title");
    const beatmakingProsItems = document.querySelectorAll(".beatmaking-pros .beatmaking-pros-item");
    setTimeout(() => {
        enableElement(beatmakingProsTitle);
        setTimeout(() => {
            beatmakingProsItems.forEach((item, i) => {
                setTimeout(() => {
                    enableElement(item);
                }, 120 * i);
            });
        }, 300);
    }, beatmakingProsDuration);
    slidesLogic.push(slideHomeLogic);
}
function beatmakingDefinitionLogic() {
    const querySelector = QuerySelectorManager.createQuerySelector(".beatmaking-def");
    const question = querySelector(".question-wrap:nth-of-type(1) .question");
    const firstDefHalf = querySelector(".beatmaking-definition-parts .first-half");
    const secondDefHalf = querySelector(".beatmaking-definition-parts .second-half");
    const question2 = querySelector(".question-wrap:nth-of-type(2) .question");
    const basicParts = querySelector(".question-wrap:nth-of-type(2) .beat-two-parts");
    const beatParts = querySelector(
        ".question-wrap:nth-of-type(2) .beat-parts .beat-part",
        {
            all: true
        }
    );
    const firstQuestionDuration = 150;
    // all summed timeouts duration
    const secondQuestionDuration = firstQuestionDuration + 100 + 200 + 600;
    setTimeout(() => {
        enableElement(question);
        setTimeout(() => {
            enableElement(firstDefHalf);
            setTimeout(() => {
                enableElement(secondDefHalf)
            }, 200);
        }, 100);
    }, firstQuestionDuration);
    setTimeout(() => {
        enableElement(question2);
        setTimeout(() => {
            enableElement(basicParts);
            setTimeout(() => {
                beatParts.forEach((beatPart, i) => {
                    setTimeout(() => {
                        enableElement(beatPart);
                    }, 150 * (i + 1));
                });
            }, 400);
        }, 200);
    }, secondQuestionDuration);
    slidesLogic.push(beatmakingDefinitionLogic);
}
function melodyDefLogic() {
    const querySelector = QuerySelectorManager.createQuerySelector(".melody-def");
    const melodyInEquation = querySelector(".melody-equation .melody-equation-melody");
    const drumsInEquation = querySelector(".melody-equation .melody-equation-drums");
    const equationResult = querySelector(".melody-equation .melody-equation-result");
    const defStart = querySelector(".melody-def-start .def-start");
    const defStart2 = querySelector(".melody-def-start .def-start:nth-of-type(2)");
    const melodyDefinition = querySelector(".melody-definition .melody");
    const melodyDefinitionParts = querySelector(".melody-definition .melody-definition-parts .melody-definition-part", { all: true });
    const melodyRole = querySelector(".melody-role");
    const melodyEquationDuration = 150 + 300 + 300;
    const definitionStart = melodyEquationDuration + 300 + 300;
    if (melodyInEquation) {
        setTimeout(() => {
            enableElement(melodyInEquation);
            setTimeout(() => {
                enableElement(drumsInEquation);
                setTimeout(() => {
                    enableElement(equationResult);
                }, 300);
            }, 300);
        }, 150);
    }
    if (defStart) {
        setTimeout(() => {
            enableElement(defStart);
            setTimeout(() => {
                enableElement(defStart2);
            }, 150);
        }, melodyEquationDuration + 300);
    }
    if (melodyDefinition) {
        setTimeout(() => {
            enableElement(melodyDefinition);
            const melodyDefinitionPartsDuration = 150;
            melodyDefinitionParts.forEach((melodyDef, i) => {
                setTimeout(() => {
                    enableElement(melodyDef);
                }, melodyDefinitionPartsDuration * (i + 1));
            });
            setTimeout(() => {
               enableElement(melodyRole) 
            }, melodyDefinitionPartsDuration * melodyDefinitionParts.length + 400);
        }, definitionStart + 300);
    }
    slidesLogic.push(melodyDefLogic);
}
function drumsDefLogic() {
    const querySelector = QuerySelectorManager.createQuerySelector(".drums-def");
    function querySelectorDrumSound(drumSelector = "") {
        const result = querySelector(".drum-sounds .drum-sound." + drumSelector);
        return result;
    }
    const drumsTitle = querySelector(".drums-definition-title");
    const drumsDefinition = querySelector(".drums-definition");
    const drumSoundsExamples = querySelector(".drum-sounds-examples");
    let drumsTitleDuration = null;
    const drumSounds = querySelector(".drum-sounds .drum-sound", { all: true });
    if (drumsTitle) {
        const drumsTitleContent = drumsTitle.textContent.split("");
        drumsTitle.innerHTML = "";
        drumsTitleContent.forEach(item => {
            drumsTitle.innerHTML += `<span class="drums-title-item">${item}</span>`;
        });
        enableElement(drumsTitle);
        setTimeout(() => {
            drumsTitle.childNodes.forEach((item, i) => {
                setTimeout(() => {
                    enableElement(item);
                }, 200 * (i));
            });
        }, 100);
    }
    if (drumsDefinition) {
        drumsTitleDuration = 100 + 200 * drumsTitle.childNodes.length;
        setTimeout(() => {
            enableElement(drumsDefinition);
        }, (100 * drumsTitle.childNodes.length) + 900);
    }
    if (drumSoundsExamples) {
        setTimeout(() => {
            enableElement(drumSoundsExamples)
        }, (100 * drumsTitle.childNodes.length) + 1500);
    }
    if (drumSounds && drumsTitle) {
        setTimeout(() => {
            drumSounds.forEach((sound, i) => {
                setTimeout(() => {
                    enableElement(sound);
                }, 250 * (i + 1));
            });
        }, (100 * drumsTitle.childNodes.length) + 900 + 500);
    }
    slidesLogic.push(drumsDefLogic);
}
function slideExamplesLogic() {
    function animateDrum(drumSelector) {
        const drum = document.querySelector(".drum-sound." + drumSelector);
        if (drum) {
            drum.classList.remove("highlighted");
            drum.style.animation = "sdaf";
            setTimeout(() => {
                drum.style.animation = null;
                drum.classList.add("highlighted");
            }, 0);
        }
    }
    window.onkeydown = function(e) {
        // alt and shift are like conventionally for drums
        // ctrl key is for beats
        // why idk lol
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
        } else if (e.key === "b") {
            playAudio(second808);
            animateDrum("drum-808");
        } else if (e.altKey && e.key === "o") {
            playAudio(oh2FileName);
            animateDrum("oh");
        } else if (e.altKey && e.key === "c") {
            playAudio(snare2FileName);
            animateDrum("clap-snare");
        } else if (e.key === "h") {
            playAudio(hhFileName);
            animateDrum("hh");
        } else if (e.key === "c") {
            playAudio(clap1FileName);
            animateDrum("clap-snare");
        } else if (e.key === "o") {
            playAudio(ohFileName);
            animateDrum("oh");
        } else if (e.key === "s") {
            playAudio(snareFileName);
            animateDrum("clap-snare");
        } else if (e.key === "1") {
            playAudio(first808);
            animateDrum("drum-808");
        }
    }
    const querySelector = QuerySelectorManager.createQuerySelector(".examples");
    const examplesTitle = querySelector(".examples-title");
    const examplesDescription = querySelector(".examples-description");
    const examplesTitleDuration = 100;
    const examplesDescriptionDuration = examplesTitleDuration + 1000;
    if (examplesTitle) {
        setTimeout(() => {
            enableElement(examplesTitle);
        }, examplesTitleDuration);
    }
    if (examplesDescription) {
        setTimeout(() => {
            enableElement(examplesDescription);
        }, examplesDescriptionDuration);
    }
    slidesLogic.push(slideExamplesLogic);
}
function starBeatmakersLogic() {
    const querySelector = QuerySelectorManager.createQuerySelector(".star-beatmakers");
    const starBeatmakersTitle = querySelector(".star-beatmakers-title");
    const starBeatmakerTitle = querySelector(".star-beatmaker .star-beatmaker-title");
    const starBeatmakerDesc = querySelector(".star-beatmaker .description");
    const starBeatmakerIncome = querySelector(".star-beatmaker .income");
    const nickJuiceWRLDProduction = querySelector(".star-beatmaker .juice-wrld-production");
    const starBeatmakersTitleDuration = 300;
    const starBeatmakerTitleDuration = starBeatmakersTitleDuration + 200;
    const starBeatmakerDescDuration = starBeatmakerTitleDuration + 500;
    const starBeatmakerIncomeDuration = starBeatmakerDescDuration + 200;
    const nickMiraJuiceWRLDProductionDuration = starBeatmakerIncomeDuration + 450;
    setTimeout(() => {
        if (starBeatmakersTitle) {
            setTimeout(() => {
                enableElement(starBeatmakersTitle);
            }, starBeatmakersTitleDuration);
        }
        if (starBeatmakerTitle) {
            setTimeout(() => {
                enableElement(starBeatmakerTitle);
            }, starBeatmakerTitleDuration);
        }
        if (starBeatmakerDesc) {
            setTimeout(() => {
                enableElement(starBeatmakerDesc);
            }, starBeatmakerDescDuration);
        }
        if (starBeatmakerIncome) {
            setTimeout(() => {
                enableElement(starBeatmakerIncome);
            }, starBeatmakerIncomeDuration);
        }
        if (nickJuiceWRLDProduction) {
            setTimeout(() => {
                enableElement(nickJuiceWRLDProduction);
            }, nickMiraJuiceWRLDProductionDuration)
        }
    }, 1000);
    slidesLogic.push(starBeatmakersLogic);
}
function JuiceWrldSlideLogic() {
    slidesLogic.push(JuiceWrldSlideLogic);
}
function conclusionSlideLogic() {
    const conclusionText = document.querySelector(".conclusion .conclusion-text");
    if (conclusionText) {
        const divider = ". ";
        const conclusionContent = conclusionText.textContent.split(divider);
        conclusionText.innerHTML = "";
        conclusionContent.forEach((item) => {
            conclusionText.innerHTML += `<span class="conclusion-text-item">${item + divider}</span>`;
            // const conclusionTextItem = document.createElement("span");
            // conclusionTextItem.classList.add("conclusion-text-item");
            // conclus
        });
        const childNodes = conclusionText.childNodes;
        const lastChildNode = childNodes[childNodes.length - 1];
        let lastNodeText = lastChildNode.innerHTML;
        lastNodeText = lastNodeText.split("");
        lastNodeText.pop();
        lastNodeText.pop();
        lastNodeText = lastNodeText.join("");
        lastChildNode.innerHTML = lastNodeText;
        conclusionText.childNodes.forEach((item, i) => {
            if (i === 0) {
                setTimeout(() => {
                    enableElement(item);
                }, 100);
            } else {
                setTimeout(() => {
                    enableElement(item);
                }, 2000 * i)
            }
        });
    }
    slidesLogic.push(conclusionSlideLogic);
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

// const nextSlideController = document.querySelector(".slider .next-slide");
// const prevSlideController = document.querySelector(".slider .prev-slide");
// nextSlideController.onclick = nextSlide(currentSlide);
// prevSlideController.onclick = prevSlide(currentSlide);
