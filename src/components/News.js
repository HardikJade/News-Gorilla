import React, { Component} from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'
// import Spinner from './Spinner'
export class News extends Component {    
    static defaultProps = {
        data : {
            country : 'in',
            item_per_page : 9,
        },
        cat : 'general'
    }
    constructor(){
        super();
        this.state = {
            articles : [],         
            totalResults : 0,
            page: 1,
            totalPage : 0,
            loading: true
        }
    }
    getData = async (pageNo = 1)=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.data.country}&apiKey=${this.props.data.api}&page=${pageNo}&pageSize=${this.props.data.item_per_page}&category=${this.props.cat}`
        // let url = `http://localhost:3000/data.json?page=${pageNo}`;
        let data_raw = await fetch(url)
        let data = await data_raw.json()
        return data;        
    }
    async componentDidMount(){
        this.props.data.progress(10)
        this.setState({loading:true})
        this.props.data.progress(20)
        let data = await this.getData();
        this.props.data.progress(70)
        this.setState({
            articles : data.articles,
            totalResults : data.totalResults,
            page : 1,
            loading: false,
            totalPage : Math.ceil(data.totalResults/10)
        })
        this.props.data.progress(100)
        document.getElementsByTagName("body")[0].style.overflow = 'scroll';
    }
    // nextBtn = async ()=>{
    //     this.setState({loading:true})
    //     let data = await this.getData(this.state.page + 1);
    //     this.setState({
    //         articles : data.articles,
    //         totalResults : data.totalResults,
    //         page : this.state.page + 1,
    //         loading: false,
    //         totalPage : Math.ceil(data.totalResults/10)
    //     })
    //     document.getElementsByTagName("body")[0].style.overflow = 'scroll';
    // }
    // backBtn = async ()=>{
    //     let page_s = (this.state.page - 1 > Math.ceil(this.state.totalResults/10)) ? 1 : this.state.page - 1
    //     this.setState({loading:true})
    //     let data = await this.getData(page_s);
    //     this.setState({
    //         articles : data.articles,
    //         totalResults : data.totalResults,
    //         page : page_s,
    //         loading: false,
    //         totalPage : Math.ceil(data.totalResults/10)
    //     })
    //     document.getElementsByTagName("body")[0].style.overflow = 'scroll';
    // }
    fetchMoreData = async ()=>{
        let data = await this.getData(this.state.page + 1);
        this.setState({
            articles : this.state.articles.concat(data.articles),
            totalResults : data.totalResults,
            page : this.state.page + 1,
            loading: false,
            totalPage : Math.ceil(data.totalResults/10)
        })
    }
    render() {        
            return(
                <>
                    {/* {this.state.loading && <Spinner/>} */}
                    {/* {true && <Spinner/>} */}
                    <>



                        {/* <div className="row my-3">
                            {this.state.articles.map(data=>{                                    
                                    return(
                                        <div key = {data.title} className="col-md-4 my-3">
                                            <NewsItem data = {data} />
                                        </div>
                                    )
                                })}
                        </div> */}

                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.totalResults > this.state.articles.length}
                            loader={<h4 className='text-center'>Loading...</h4>}
                        >
                            {
                                <div style={{marginTop:'100px'}} className="container">
                                    <div className="row my-3">
                                    {this.state.articles.map(data=>{                                    
                                            return(
                                                <div key = {data.title} className="col-md-4 my-3">
                                                    <NewsItem data = {data} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                            </InfiniteScroll>

                        {/* <div className="container d-flex justify-content-between my-4">
                            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.backBtn}>&#8701; Previous</button>
                            <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/10)} className="btn btn-dark" onClick={this.nextBtn}>Next &#8702;</button>
                        </div> */}
                    </>

                </>
            )
        }
}
export default News
