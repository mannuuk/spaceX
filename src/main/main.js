import React, { useState, useEffect } from "react";
import axios from 'axios';
import CustomScroller from 'react-custom-scroller';
import './main.css';

// &launch_success=true&land_success=true&launch_year=2014

const callApi = (data) => {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    if (data.year)
    url += `&launch_year=${data.year}`;
    if (data.launch_success == true || data.launch_success == false)
    url += `&launch_success=${data.launch_success}`; 
    if (data.land_success == true || data.land_success == false)
    url += `&land_success={data.land_success}`;  
    return axios.get(url).then(res => {
        return res.data
    })
    
}

const Main = props => {
    const [dataArr, setDataArr] = useState([]);
    const [filter, setFilter] = useState({year:'',launch_success:undefined,land_success:undefined});
    useEffect(() => {
        callApi({}).then(res => setDataArr(res))  
    }, [])

    console.log(dataArr);


    const  dataFilter =  (val,type) => { 
        if(type == 'year'){
             setFilter(prev => {return {...prev,year : val} });
        }
        if (type == 'launch_success'){
             setFilter(prev => {return {...prev,launch_success : val} });
        }
        if (type == 'land_success'){
             setFilter(prev => {return {...prev,land_success : val} });
        }
        if(type == 'reset'){
             setFilter(prev => {return {year:'',launch_success:undefined,land_success:undefined} });
        }
        
    }

    useEffect(() => {
        callApi(filter).then(res => setDataArr(res))
    }, [filter])



    return (
        <div>
            <div className="top-headbar">
                <div className="container">
                    <h2>SpaceX Launch Programs</h2>
                </div>
            </div>
            <div className="spaceX-mainWrapper">
                <div className="container">
                    <div className="spaceX-wrapper">
                        <div className="spaceX-filterBx">                    
                            <CustomScroller className="spaceX-innerFilterBx">
                            <h4>Filters</h4>
                            <div className="filter-btnBx">
                                <h6>Launch Year</h6>
                                <a href="javascript:void(0)" className={ filter.year == '2006' ? 'active' : ''} onClick={ () => dataFilter(2006, 'year')}>2006</a>
                                <a href="javascript:void(0)" className={ filter.year == '2007' ? 'active' : ''} onClick={ () => dataFilter(2007, 'year')}>2007</a>
                                <a href="javascript:void(0)" className={ filter.year == '2008' ? 'active' : ''} onClick={ () => dataFilter(2008, 'year')}>2008</a>
                                <a href="javascript:void(0)" className={ filter.year == '2009' ? 'active' : ''} onClick={ () => dataFilter(2009, 'year')}>2009</a>
                                <a href="javascript:void(0)" className={ filter.year == '2010' ? 'active' : ''} onClick={ () => dataFilter(2010, 'year')}>2010</a>
                                <a href="javascript:void(0)" className={ filter.year == '2011' ? 'active' : ''} onClick={ () => dataFilter(2011, 'year')}>2011</a>
                                <a href="javascript:void(0)" className={ filter.year == '2012' ? 'active' : ''} onClick={ () => dataFilter(2012, 'year')}>2012</a>
                                <a href="javascript:void(0)" className={ filter.year == '2013' ? 'active' : ''} onClick={ () => dataFilter(2013, 'year')}>2013</a>
                                <a href="javascript:void(0)" className={ filter.year == '2014' ? 'active' : ''} onClick={ () => dataFilter(2014, 'year')}>2014</a>
                                <a href="javascript:void(0)" className={ filter.year == '2015' ? 'active' : ''} onClick={ () => dataFilter(2015, 'year')}>2015</a>
                                <a href="javascript:void(0)" className={ filter.year == '2016' ? 'active' : ''} onClick={ () => dataFilter(2016, 'year')}>2016</a>
                                <a href="javascript:void(0)" className={ filter.year == '2017' ? 'active' : ''} onClick={ () => dataFilter(2017, 'year')}>2017</a>
                                <a href="javascript:void(0)" className={ filter.year == '2018' ? 'active' : ''} onClick={ () => dataFilter(2018, 'year')}>2018</a>
                                <a href="javascript:void(0)" className={ filter.year == '2019' ? 'active' : ''} onClick={ () => dataFilter(2019, 'year')}>2019</a>
                                <a href="javascript:void(0)" className={ filter.year == '2020' ? 'active' : ''} onClick={ () => dataFilter(2020, 'year')}>2020</a>
                            </div>

                            <div className="filter-btnBx">
                                <h6>Successful Launch</h6>
                                <a href="javascript:void(0)" className={ filter.launch_success == true ? 'active' : ''} onClick={ () => dataFilter(true, 'launch_success')}>True</a>
                                <a href="javascript:void(0)" className={ filter.launch_success == false ? 'active' : ''} onClick={ () => dataFilter(false, 'launch_success')}>False</a>
                            </div>

                            <div className="filter-btnBx">
                                <h6>Successful Landing</h6>
                                <a href="javascript:void(0)" className={ filter.land_success == true ? 'active' : ''} onClick={ () => dataFilter(true, 'land_success')}>True</a>
                                <a href="javascript:void(0)" className={ filter.land_success == false ? 'active' : ''} onClick={ () => dataFilter(false, 'land_success')}>False</a>
                            </div>

                            <div className="filter-btnBx">
                                <h6>Reset</h6>
                                <a href="javascript:void(0)" onClick={ () => dataFilter('', 'reset')}>Reset</a>
                            </div>
                            </CustomScroller>                            
                            
                        </div>
                        <div className="spaceX-itemWrap">
                            { dataArr.length != 0 ? dataArr.map(res => <div className="spaceX-item">
                                <div className="spaceX-item-inner">
                                    <div className="spaceX-item-imgBx">
                                        <img src={res.links.mission_patch} alt="spaceX" title="spaceX" />
                                    </div>
                                    <div className="spaceX-itemInfo">
                                        <h6><a href="javascript:void(0)">{res.mission_name} #{res.flight_number}</a></h6>
                                        <p><b>Mission Id: </b>{res.mission_id != '' ? res.mission_id : 'NA'}</p>
                                        <p><b>Launch Year: </b>{res.launch_year}</p>
                                        <p><b>Successful Launch: </b>{res.launch_success ? 'true' : 'false'}</p>
                                        <p><b>Successful Landing: </b>{res.launch_landing ? res.launch_landing : 'NA'}</p>
                                    </div>
                                </div>
                            </div>) : <div className="nodata-strip">No Data Found</div>}
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main