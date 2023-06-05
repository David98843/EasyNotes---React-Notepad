const Header = (props) => {

    return(
        <div className = 'header'>
            <div className="header-cont">
                <div className="header-logo">
                    <h2><span>Easy</span>NOTES</h2>
                </div>
                <div className="header-icons">
                    <i className = 'ri-home-3-line' onClick={() => {
                        props.toggleShowFavorites(false)
                    }}></i>                    
                    <i className = 'ri-heart-fill' onClick={() => {
                        props.toggleShowFavorites(true)
                    }}></i>
                    {!props.noteState ? <i className = 'ri-add-line' onClick = {props.showAddForm}></i> : " " }
                </div>
            </div>
        </div>
    )

}

export default Header