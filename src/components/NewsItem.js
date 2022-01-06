import React, { Component } from 'react'
export class NewsItem extends Component {
    render() {
        let data = this.props.data;
        return (
            <>
                <div className="card">
                    <img src={(data.urlToImage == null) ? "https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=300%2C203&ssl=1" : data.urlToImage} className="card-img-top" alt="Item Loading Failed"/>
                    <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.desc}</p>
                        <a href = {data.url} target= '_blank' rel="noreferrer" className="btn btn-primary">Read More</a>
                        <p className="card-text my-2"><small className="text-muted">{(new Date(data.publishedAt)).toGMTString()}</small></p>
                        <p className="card-text my-2"><small className="text-muted">{(data.author == null) ? "----" : data.author}</small></p>
                    </div>
                </div>
            </>
        )
    }
}
export default NewsItem
