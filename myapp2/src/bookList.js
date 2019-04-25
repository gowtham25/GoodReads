import React from 'react';

const bookList = (props) => {
    console.log(props)
    return(
        <tr>
            <td>
                <img src={props.bookData['best_book']['small_image_url']._text} alt="img"/>
            </td>
            <td>{props.bookData['best_book'].author.name._text}</td>
            <td>{props.bookData['best_book'].title._text}</td>
            <td>{props.bookData['average_rating']._text}</td>
        </tr>
    )
}
export default bookList;