import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';

export default class News extends Component {

  static defaultProps ={
    country : "in",
    pageSize : 8,
    category : "general"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,

  }


  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(){
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,



    }

    // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;

}

  async componentDidMount()
  {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d01a8a7c7e7a4c8d8504ef88dcea46a5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles })
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d01a8a7c7e7a4c8d8504ef88dcea46a5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
        articles : this.state.articles.concat(parsedData.articles),
        totalResults : parsedData.totalResults,
        loading: false,

    })
  };


  render() {
    return (
      <div className='container my-3'>
            <h2 className='text-center my-4'>NewMonkey - Top Heading</h2>
            <InfiniteScroll dataLength={this.state.articles && this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.totalResults}
                loader={<h4>Loading...</h4>}
              >
                <div className='container'>
                  <div className="row">
                      
                      {this.state.articles && this.state.articles.map((element)=>{
                      return <div className="col-md-4 my-2" key={element.url}>
                          <NewsItem title={element.title?element.title.slice(0, 45):""}
                              description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage}
                              newsUrl={element.url} />
                      </div>
                      })}
                  </div>
                </div>
           
          </InfiniteScroll>

      </div>
    )
  }
}
