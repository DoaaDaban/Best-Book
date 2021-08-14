import React, { Component } from 'react'

class UpdateBook extends Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.UpdateBook(e)}>
                <fieldset>
                    <legend>Update Book</legend>
                    <label>Title</label>
                    <input type="text" name="bookName" defaultValue={this.props.bookName}/>
                    <label>description</label>
                    <input type="text" name="bookDescription" defaultValue={this.props.bookDescription}/>
                    <label>status</label>
                    <input type="text" name="bookStatus" defaultValue={this.props.bookStatus}/>
                    <label>image</label>
                    <input type="text" name="bookImage" defaultValue={this.props.bookImage}/>
                    <input type="submit" value="Update" />
                </fieldset>
            </form>
        )
    }
}

export default UpdateBook;