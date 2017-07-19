import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyC7FnbtzSJG0iGTxpRh_nrEQMJn5LGj05A';


class App extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('tour de france');
  }

 videoSearch(term) {
      YTsearch({ key: API_KEY, term: term}, (data) => {
          this.setState({
            videos: data,
            selectedVideo: data[0]
          });
      });
    }


  render () {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500)
    return (
    <div>
    <SearchBar onSearchTermChange={videoSearch}/>
    <VideoDetail video={this.state.selectedVideo} />
    <VideoList
      onVideoSelect={selectedVideo => this.setState({selectedVideo: selectedVideo})}
      videos={this.state.videos} />
    </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
