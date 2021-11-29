import React, { useState } from 'react'
import axios from 'axios'
import Select from 'react-select'


function AddAuction(props){
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingPrice: '',
        startTime: Date.now(),
        duration: 12,
        transactionType: '',
        auctionType: '',
        image: ''
    })

    function addAuction(e) {
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.get('http://localhost/api/currentUser', {}, {headers: {withCredentials: true}})
        .then((res) => {
            console.log(res.data.status)
            if(res.data.status === 400){
               return
            }

            if(res.data.status === 200){
                const {data} = res.data

                if(data.role === 0){
                    props.history.push("/")
                }

                let auctionData = {
                    userId: data.userId,
                    name: formData.name,
                    description: formData.description,
                    startTime: formData.startTime,
                    startingPrice: formData.startingPrice,
                    duration: formData.duration,
                    transactionType: formData.transactionType.value,
                    auctionType: formData.auctionType.value,
                    image: formData.image
                }


                axios.defaults.withCredentials = true;
                axios.post('http://localhost/api/auction', auctionData,{}, {headers: {withCredentials: true}})
                    .then((res) => {
                        if(res.data.status === 200){
                            props.history.push("/")
                        } else {
                            prompt('Auction wasnt created')
                        }
                    })
            }
        })
    }

    const transactionTypeOpts = [
        { value: 'sell', label: 'Sell'},
        { value: 'buy', label: 'Buy'}
    ]

    const auctionTypeOpts = [
        { value: 'open', label: 'Open'},
        { value: 'closed', label: 'Closed'}
    ]


    return(  
        <form>
                <h1 className='h1 mt-5 mb-5'>Create new auction</h1>
                <div className="form-group">
                    <label htmlFor="text">Name</label>
                    <input onChange={(e) => setFormData({...formData, name: e.target.value})}  value={formData.name} type="text" className="form-control" id="name" placeholder="Name..."></input>
                </div>
                <div className="form-group">
                    <label htmlFor="transactionTypeSelect">Transaction type</label>
                    <Select
                        id="transactionTypeSelect"
                        name="form-field-name"
                        value={formData.transactionType}
                        options={transactionTypeOpts}
                        placeholder="Select transaction type"
                        searchable={false}
                        onChange={(e) => 
                            setFormData({...formData, transactionType: e})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="auctionTypeSelect">Auction type</label>
                    <Select
                        id="auctionTypeSelect"
                        name="form-field-name"
                        value={formData.auctionType}
                        options={auctionTypeOpts}
                        placeholder="Select auction type"
                        searchable={false}
                        onChange={(e) => 
                            setFormData({...formData, auctionType : e})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Starting price</label>
                    <input onChange={(e) => setFormData({...formData, startingPrice: e.target.value})}  value={formData.startingPrice} type="text" className="form-control" id="name" placeholder="Price in €..."></input>
                </div>
            
            
                <div className="form-group " >
                    <label htmlFor="exampleFormControlTextarea1">Auction description</label>
                    <textarea onChange={(e) => setFormData({...formData, description: e.target.value})}  value={formData.description} className="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="Description..."></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Add photo</label>
                    <input nChange={(e) => setFormData({...formData, image: e.target.value})}  value={formData.image} type="file" className="form-control-file" id="exampleFormControlFile1"></input>
                </div>
                <button type="submit" className="btn btn-dark mt-5" onClick={addAuction}>Create Auction</button>
        </form>
    )
}
export default AddAuction