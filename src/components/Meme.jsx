import React from "react"

function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })

    const [allMeme, setAllMeme] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => setAllMeme(data.data.memes))
        
    }, [])

    function getNewMeme(){
        const randomIndex = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomIndex].url
        return url
    }

    function handleSetRandomMemeUrl(event) {
        event.preventDefault()
        const newUrl = getNewMeme()
        setMeme(prevState => ({...prevState, randomImage: newUrl}))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => (
            {...prevMeme, 
                [name]: value
            }
        ))
    }

    return (
        <main >
            <form className="form">
                    <input type="text" placeholder="Top Text" name="topText" onChange={handleChange} />
                    <input type="text" placeholder="Bottom Text" name="bottomText" onChange={handleChange} value={meme.bottomText}/>
                <button 
                    className="button--meme"
                    onClick={handleSetRandomMemeUrl}>
                    Get a new meme image
                </button>
            </form>
            <div className="meme">
                {meme.randomImage && <img className="meme--image" src={meme.randomImage}/>}
                <h2 className="top-text---meme top">{meme.topText}</h2>
                <h2 className="bottom-text---meme bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme