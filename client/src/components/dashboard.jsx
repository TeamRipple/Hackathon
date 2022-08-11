import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./listgroup";
import Posts from "./posts";
import { paginate } from "../utils/paginate";
import config from "../config.json";
import http from "../services/httpService";
import "../components/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// class for dashboard page
class Dashboard extends Component {
  // state variables for dashboard 
  state = {
    allposts: [],
    currentPage: 1,
    pageSize: 4,
    tags: [],
    selectedTag: { _id: "1", name: "All Posts" },
    searchWord: '',
  };

  //Component mount for all posts and side-tags
  async componentDidMount() {
    //backend call for getting all posts and related tags
    const { data: allposts } = await http.get(config.postEndPoint);
    const { data: tags } = await http.get(config.tagsEndPoint);

    this.setState({
      allposts: [...allposts],
      tags: [
        {
          _id: "1",
          name: "All Posts",
        },
        ...tags,
      ],
    
    });
  }

  //function for pagination 
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //function for handling tag selection.
  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1, searchWord:'' });
  };

  //function for filtering of posts based on selected tag(categories) 
  getPosts() {
    const { allposts, selectedTag } = this.state;
    const filtered = [];
    for (let i in allposts) 
    {
      const post = allposts[i];
      const { tags } = post;
      console.log(post);
      for (let j in tags) {
        if (tags[j].name === selectedTag.name) 
        {
          filtered.push(post);
          break;
        }
      }
    }
    console.log(filtered);
    //returning latest post first
    return filtered.reverse();
  }  

  //function to store value of the search bar
  handleFilter = (event) => 
  {
      const searchWord = event.target.value;
      this.setState({ searchWord: searchWord.toLowerCase()});
  };

  //function for filtering of posts based on Search bar value 
  getPosts1 = () => 
  {
        const { allposts, searchWord} = this.state;
        console.log(searchWord)
        const filtered = [];
        //Splitting words in the posts for search
        for (let i in allposts) 
        {
          const post = allposts[i];
          const { title } = post;
          const {description} = post;
          const {author} = post;
          //splitting using regex
          const myarr = title
          const myarr1 = description
          const myarr2 = author.name
          // searching for word in title of posts and appending to list
          if (myarr.toLowerCase().includes(searchWord)) 
          //remove duplication in listing of post
          {  if(!(filtered.includes(post)))
            {    console.log("1")
                filtered.push(post);
              
            }   
          }
          // searching for word in description of posts and appending to list
          if (myarr1.toLowerCase().includes(searchWord)) 
          console.log("2");
          {//remove duplication in listing of post
            if(!(filtered.includes(post)))
            {    
              filtered.push(post);
            }    
          }
          // searching for word in names of authors for posts and appending to list
          if (myarr2.toLowerCase().includes(searchWord)) 
          {//remove duplication in listing of post
            
            if(!(filtered.includes(post)))
            {    
              filtered.push(post);
            }    
          }
        }
      //returning latest post first
      return filtered.reverse();
  };
  
  //rendering the functions and values from class dashboard  
  render() 
  {
      const { user } = this.props;
      const { allposts, pageSize, currentPage, tags, selectedTag, searchWord} = this.state;
      //filtered is list variable having all the posts based on selected tag or search bar.
      const filtered = selectedTag._id === "1" ? (searchWord === '' ? allposts.reverse() : this.getPosts1(searchWord) ) : (searchWord === '' ? this.getPosts() : this.getPosts1(searchWord));
      const posts = paginate(filtered, currentPage, pageSize);
      //If no posts found then display :
      if (allposts.length === 0)
        return <p>❕There are no posts in CL Connects !!!</p>;
      else  
      //If posts found then
      return (
        <div>
           <React.Fragment>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="d-flex w-100 justify-content-between m-3">
                        Showing {filtered.length} posts.
                        { user && (
                          <Link to="/new-post">
                            <button                    
                              type="button"
                              class="btn btn-success"
                              style={{ marginBottom: 20, marginRight:50 }}
                            >
                              New Post  <FontAwesomeIcon icon={faMessage} />
                            </button>
                          </Link>
                        )}
                    </div>
                 </div>
              </div>
              <div className="row">
                <div className="col-9">
                  <Posts posts={posts} />
                </div>
                <div className="col-3">
                  <label htmlFor="Search"> <FontAwesomeIcon icon={faMagnifyingGlass} /> &nbsp; Search</label>
                  <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleFilter}
                  />
                  <br/>
                  <br/>
                 
                  <ListGroup
                    items={tags}
                    selectedTag={this.state.selectedTag}
                    onTagSelect={this.handleTagSelect}
                  />
                </div>
                <Pagination
                  itemCount={filtered.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </React.Fragment>
        </div>
    );
  }
}
export default Dashboard;
