import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

function Search({search}) {
    return '';
    console.log('search',search)
    const {product,category} = search;
    
    const [results , setResults] = useState({});
    const [resultsCat , setResultsCat] = useState({});
    const [input, setInput] = useState("")
    const fetchCat = async(value) => {
      

                var key = value;
                var split_data = key.toLowerCase();
                var split_data = split_data.split(" ");                
                let tempArr_cat = category;    

                Object.keys(split_data).forEach(item => { 
                   const result = tempArr_cat.filter(x => x.content_word.find(a => a === split_data[item]) || x.title.match(split_data[item]));
                    if (result.length > 0) {
                        tempArr_cat = result;
                    } else { 
                        tempArr_cat = result;
                    } 
                });
                setResultsCat({ ...resultsCat, product_cat: tempArr_cat });
           
    };


    const fetchData = async(value) => {
        

                var key = value;
                var split_data = key.toLowerCase();
                var split_data = split_data.split(" ");                
                let tempArr = product;    

                Object.keys(split_data).forEach(item => { 
                   const result = tempArr.filter(x => x.content_word.find(a => a === split_data[item]) || x.title.match(split_data[item]));
                    if (result.length > 0) {
                        tempArr = result;
                    } else { 
                        tempArr = result;
                    }
                });
                setResults({ ...results, products: tempArr });
    };
    
    const handleChange = (value) => { 
            let lowerValue = value.toLowerCase();
            setInput(lowerValue);
            fetchCat(lowerValue);
            fetchData(lowerValue);
            
    }
    console.log('results',results);
    console.log('resultsCat',resultsCat);
    return (
        <div key="searchsection">
           <div className='input-wrapper'>
            <input placeholder='Please Search here' minLength={3} value={input} onChange={(e) => handleChange(e.target.value)} />
            </div>
            {results?
                <div className="results-list">
                    <div className="result_product_cat">
                        <ul>
                        <h3>Categories</h3>
                        { 
                        resultsCat.product_cat ?
                        resultsCat.product_cat.map((cat,i) => {
                            return (
                                <li key={i}>
                                    <Link href={cat.url} className='product_cat'>
                                        <div result={cat.title} key={i} >{cat.title}</div>
                                    </Link>
                                </li>
                            )
                        })
                        :''
                        }
                        </ul>
                    </div>
                    <div className='result_product'>
                        <ul>
                        <h3>Products- { results.products ? results.products.length : ''  }</h3>
                        {
                            results.products ?
                            results.products.slice(0, 25).map((result, id) => {
                                return ( 
                                <li key={id}>
                                    <Link href={result.url} className='products'>
                                    
                                        <div result={result.title} key={id} >{result.title}</div>
                                            
                                    </Link>
                                </li>
                            )
                            }) : ''
                        }

                        </ul>
                    </div>
                    </div>
                :null}
        </div>
    )
}

export default Search
