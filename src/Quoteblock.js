import React, { useState, useEffect } from 'react'

export default function Quoteblock() {
    const [quoteData, setQuoteData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://type.fit/api/quotes')
            .then(res => res.json())
            .then(data => {
                const randomQuote = data[Math.floor(Math.random() * data.length)]
                setQuoteData(randomQuote)
                setIsLoading(false)
            })


    }, [])
    // console.log(quoteData.text)
    return (
        <div>
            <blockquote><p>"{!isLoading && quoteData.text}"</p><p>— {!isLoading && quoteData.author}</p></blockquote>
        </div>
    )
}
