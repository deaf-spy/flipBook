import React, { useEffect } from 'react';
import { useState } from 'react';
import './flipbook.css'

import page0 from "./assets/Page_0.png"
import page1 from "./assets/Page_1.png"
import page2 from "./assets/Page_2.png"
import page3 from "./assets/Page_3.png"
import page4 from "./assets/Page_4.png"

// let pos = [1, 3, 2, 3, 2, 3] 1st state
// let pos = [1, 2, 1, 3, 2, 3] 2nd state // went right
// let pos = [1, 2, 1, 2, 1, 3] 3rd state // went right


// 1 left, 2 middle, 3 right

let newPos = 0;
let pages;

function makePage(index, isLeft, currentPos, setCurrentPage) {
    function clickHandler(e, index) {
        if (isLeft && currentPos >= 1) {
            setCurrentPage(currentPos - 1);
        } else {
            if (currentPos <= 4) {
                setCurrentPage(currentPos + 1);
            }
        }
    }

    return (
        <div id={`page${index}`} className="page" onClick={(e) => clickHandler(e, index)}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg"></img>
        </div>
    )
}

export default function MakeBook() {
    const [currentPos, setCurrentPos] = useState(0);
    const [pages1, setPages] = useState();
    const [prevTarget, setPrevTarget] = useState(0);

    let images = [page0, page1, page2, page3, page4]

    let pos = [1, 3, 2, 3, 2, 3]
    let posReference = { 1: "left", 2: "middle", 3: "right" }
    // let oddEven = ["leftPages", "rightPages"]
    
    let length = pos.length / 2;

    function clickHandler(e, index) {

        const isLeft = (index+1) % 2;
        let moved = 0;
        let oldPos = newPos;

        if (isLeft && newPos >= 1) {
            newPos = newPos - 1;
            moved = 1;
        } else if (!isLeft && newPos < length-1) {
            newPos = newPos + 1;
            moved = 2;
        } else {
            console.log("not moving")
            return;
        }

        // console.log("newPos", newPos)


        // console.log("moved", moved);

        if ( moved != 1 && moved != 2 && !pages[2*newPos-1]) {
            return;
        }
        // console.log("id", pages[2*newPos-1]["props"]["id"])

        let newPos1 = 0;
        if (moved == 1) {
            newPos1 = newPos + 1;
        } else {
            newPos1 = newPos;
        }

        const rightPage = document.getElementById(pages[2*newPos1-1]["props"]["id"])
        const leftPage = document.getElementById(pages[2*newPos1]["props"]["id"])

        const oldLeftPage = document.getElementById(pages[2*oldPos]["props"]["id"])
        const oldRightPage = document.getElementById(pages[2*oldPos + 1]["props"]["id"])

        const newLeftPage = document.getElementById(pages[2*newPos]["props"]["id"])
        const newRightPage = document.getElementById(pages[2*newPos + 1]["props"]["id"])

        rightPage.classList.remove("left")
        rightPage.classList.remove("middle")
        rightPage.classList.remove("right")
        leftPage.classList.remove("left")
        leftPage.classList.remove("middle")
        leftPage.classList.remove("right")

        if (moved == 1) {

            rightPage.classList.add("focus")
            rightPage.classList.add("right")
            leftPage.classList.add("focus")
            leftPage.classList.add("middle")
        } else {
            rightPage.classList.add("focus")
            rightPage.classList.add("middle")
            leftPage.classList.add("focus")
            leftPage.classList.add("left")
        }

        setTimeout(() => {
            newLeftPage.classList.add("focus")
            newRightPage.classList.add("focus")

            oldLeftPage.classList.remove("focus")
            oldRightPage.classList.remove("focus")
        }, 1000)

    
    }

    useEffect(() => {
        
        pagesInit()

    }, [])

    useEffect(() => {
        // console.log("2: current", currentPos)
    }, [currentPos])

    function pagesInit() {
        setPages(pos.map((v, i) => {
            return (
                <div id={"page" + i} className={"page " + ((i+1) % 2 ? "leftPage " : "rightPage ") + posReference[v] + (i < 2 ? " focus" : "")} key={i} onClick={(e) => clickHandler(e, i)}>
                    <img src={images[i]}></img>
                </div>
            )
        }));
    }

    useEffect(() => {
        pages = pages1;
    }, [pages1])

    return (
        <div className="cover">
            <div className="book">
                {pages1}
            </div>
        </div>
    )


}