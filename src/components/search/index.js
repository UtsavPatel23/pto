import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import { getPathNameFromUrl } from '../../utils/miscellaneous';
import placeholder from '/public/assets/img/placeholder-300.png';

function Search({ search, resultsShow, setResultsShow }) {
    // return '';
    //console.log('search', search)
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

    useEffect(() => {
        handleChange('');
    }, [])

    const submitSearch = () => {
       // console.log('input', input);
    }
    //console.log('results', results);
    //console.log('resultsCat', resultsCat);
    return (
        <div key="searchsection" className=''>
            <div className="relative overflow-hidden rounded md:block hidden" >
                <div onClick={submitSearch} className="w-12 h-[46px] bg-victoria-800 absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none rounded-r">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input onClick={() => setResultsShow(true)} placeholder='Please Search here' value="" className="outline-none block w-full p-3 pr-12 text-sm text-gray-900 border border-gray-300 rounded focus:border-victoria-400 cursor-pointer" />
            </div>

            <div
                className={`fixed top-0 left-0 h-full w-full opacity-70 bg-black z-20 ${resultsShow ? 'block' : 'hidden'}`} onClick={() => setResultsShow(false)}
            ></div>

            <div className={`search-result font-inter h-[calc(100vh_-_110px)] overflow-hidden bg-white z-20 p-4 md:p-7 ${resultsShow ? 'open-search' : ''}`}>
                <span onClick={() => setResultsShow(false)} className='cursor-pointer absolute right-2 top-2 size-9 flex items-center justify-center border border-victoria-700'> <i class="fa fa-times fa-lg"></i></span>
                <h3 className='font-semibold text-2xl text-center mb-4'>Search Product</h3>
                <div className="relative overflow-hidden mb-4"  >
                    <div onClick={submitSearch} className="w-12 h-[46px] bg-victoria-800 absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" placeholder='Please Search here' minLength={3} value={input} onChange={(e) => handleChange(e.target.value)} className="outline-none block w-full p-3 pr-12 text-sm text-gray-900 border border-gray-300 focus:border-victoria-400" />
                </div>
                <div className='grid grid-cols-4 gap-3 border border-grey-300 p-2'>
                    <div className="result_product_cat">
                        <h3 className='font-semibold mb-2 px-2'>Categories</h3>
                        <ul className='overflow-y-auto h-[calc(100vh_-_315px)] theme-scroll'>
                            {
                                resultsCat.product_cat ?
                                    resultsCat.product_cat.map((cat, i) => {
                                        var cat_url = getPathNameFromUrl(cat?.url ?? '');
                                        return (
                                            <li key={i}>
                                                <Link href={!WEB_DEVICE ? '/cat?sname=' + cat_url.split('/').slice(-2, -1)[0] : '/c' + cat_url} className='product_cat border-b border-grey-100 py-1 px-2 w-full inline-block capitalize hover:text-victoria-600' result={cat.title} key={i}>
                                                    {cat.title}
                                                </Link>
                                            </li>
                                        )
                                    })
                                    : ''
                            }
                        </ul>
                    </div>
                    <div className='result_product col-span-3'>
                        <h3 className='font-semibold mb-2'>Products : {results.products ? results.products.length : ''}</h3>
                        <ul className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 overflow-y-auto h-[calc(100vh_-_315px)] theme-scroll'>
                            {
                                results.products ?
                                    results.products.slice(0, 25).map((result, id) => {
                                        var p_slug = '';
                                        if (!WEB_DEVICE) {
                                            p_slug = '/product/?sname=' + getPathNameFromUrl(result.url ?? '');
                                        } else {
                                            p_slug = '/p' + getPathNameFromUrl(result.url ?? '');
                                        }
                                        return (
                                            <li key={id} className='border border-gray-200 p-1'>
                                                <Link href={p_slug} className='products'>
                                                    <Image
                                                        src={result.image ? result.image : placeholder}
                                                        alt={result.title}
                                                        width={100}
                                                        height={100}
                                                        className='mx-auto'
                                                    />
                                                    <p className='line-clamp-2 text-sm hover:text-victoria-600' result={result.title} key={id} >{result.title}</p>
                                                </Link>
                                            </li>
                                        )
                                    }) : ''
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Search;