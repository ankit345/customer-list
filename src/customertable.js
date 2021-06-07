import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { isCellEnterEditModeKeys } from '@material-ui/data-grid';
import Premiumicon from './check1.png';
import nonpremimum from './remove.png'
// import { useState } from 'React';
    
export class CustomerTable extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 11,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

   
    changeText = (text) => {
        if(text === "Min"){
            text = "Max"
            this.setState ({text})
        }else if (text ==="Max"){
            text = "Min"
            this.setState ({text})
        }
      
      } 
    
    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

    componentDidMount(){
        this.getData();
        
    }

    getData() {
        axios
            .get(`https://intense-tor-76305.herokuapp.com/merchants`)
            .then(res => {

                var data = res.data;
				
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData :res.data,
                    tableData:slice,
                    text:"Min"
                })
            });
    }

    render() {
        const { text } = this.state
        return (
            <div>
                  <h1>Welcome to Customer List Assignment</h1>
                  <div className="pagination_control"> 
                  <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </div>
                  <table border="1" id="customers">
                     <thead>
                         <th className="header">SNO</th>
                         <th className="header">Name</th>
                         <th>Email</th>
                         <th >Phone</th>
                         <th>Premium</th>
                         <th> Max/Min Bid</th>


                     </thead>
                     <tbody>
                        {
                          this.state.tableData.map((tdata, i) => (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{tdata.firstname} {tdata.lastname}</td>
                                    <td>{tdata.email}</td>
                                    <td>{tdata.phone}</td>
                                    <td>{tdata.hasPremium == true ?
                                    <p><img className ="img_premimum"src={Premiumicon} /></p>:
                                    <p><img className ="img_premimum"src={nonpremimum} /></p>}</td>
                                    <td></td> 
                                </tr>
                            
                          ))
                        }

                     </tbody>
                 </table>  

              

            </div>
        )
    }
}

export default CustomerTable
