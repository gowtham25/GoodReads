import React from 'react';

const bookList = (props) => (
    <tr>
        <td>
            <img src={props.bookData.best_book.small_image_url} alt="img"/>
        </td>
        <td>{props.bookData.best_book.author.name}</td>
        <td>{props.bookData.best_book.title}</td>
        <td>{props.bookData.average_rating}</td>
    </tr>
)
export default bookList;