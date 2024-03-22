import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

function Search({ search }) {
    // return '';
    console.log('search', search)
    const { product, category } = search;

    const [results, setResults] = useState({});
    const [resultsCat, setResultsCat] = useState({});
    const [input, setInput] = useState("")
    const fetchCat = async (value) => {


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


    const fetchData = async (value) => {


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
    console.log('results', results);
    console.log('resultsCat', resultsCat);
    return (
        <div key="searchsection" className=''>
            <div className="relative overflow-hidden rounded">
                <div className="w-12 h-[46px] bg-victoria-800 absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none rounded-r">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" placeholder='Please Search here' minLength={3} value={input} onChange={(e) => handleChange(e.target.value)} className="outline-none block w-full p-3 pr-12 text-sm text-gray-900 border border-gray-300 rounded focus:border-victoria-400" />
            </div>
            {results ?

                <div className="hidden results-list h-[calc(100vh_-_110px)] overflow-y-auto absolute mt-3 left-0 right-0 mx-auto w-3/4 bg-white top-14 border border-gray-300 rounded p-2 z-10">
                    <div className='grid grid-cols-3 gap-4'>
                        <div className="result_product_cat">
                            <ul>
                                <h3>Categories</h3>
                                {
                                    resultsCat.product_cat ?
                                        resultsCat.product_cat.map((cat, i) => {
                                            return (
                                                <li key={i}>
                                                    <Link href={cat.url} className='product_cat'>
                                                        <div result={cat.title} key={i} >{cat.title}</div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                        : ''
                                }
                            </ul>
                        </div>
                        <div className='result_product col-span-2'>
                            <ul>
                                <h3>Products- {results.products ? results.products.length : ''}</h3>
                                {
                                    results.products ?
                                        results.products.slice(0, 25).map((result, id) => {
                                            return (
                                                <li key={id}>
                                                    <Link href={result.url} className='products'>
                                                        <div result={result.title} key={id} >{result.title}</div>
                                                        <Image
                                                            src={result.image}
                                                            alt={result.title}
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </Link>
                                                </li>
                                            )
                                        }) : ''
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}
export default Search;