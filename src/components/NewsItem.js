import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;

    return (
      <div>
                <div className="card" >
                <img src={!imageUrl?"https://www.freeiconspng.com/uploads/no-image-icon-1.jpg":imageUrl} className="card-img-top" alt="..." height="300px" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} className="btn btn-primary">See More</a>
                    </div>
                </div>
      </div>
    )
  }
}
