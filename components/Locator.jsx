import React, { Component } from "react";
import PlaceAddress from "./PlaceAddress";

class Locator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddressData: [],
      errors: {},
      address: [{ address: "" }],
    };
  }
  /**
   * This method is used to get country detail
   */
  handleSelectSuggest = (e, value, key, searchValue) => {
    debugger;
    let selectedAddress = this.state.selectedAddressData;
    if (selectedAddress.length > 0) {
      selectedAddress[key].isSelectedAddress = true;
    }
    if (selectedAddress.length === 0) {
      let selectedAddressfields = { isSelectedAddress: true };
      selectedAddress.push(selectedAddressfields);
    }
    let data = this.state.address;
    data[key].address = e;
    data[key].search = "";

    this.setState({ address: data, selectedAddressData: selectedAddress });
    if (this.state.address.length > 1) {
      let results = [];
      for (let i = 0; i < this.state.address.length - 1; i++) {
        for (let j = i + 1; j < this.state.address.length; j++) {
          if (
            this.state.address[i].address.toLowerCase() ===
            this.state.address[j].address.toLowerCase()
          ) {
            if (this.state.address[i].address.trim().length > 0) {
              results.push(this.state.address[i]);
            }
          }
        }
      }
      let errors = this.state.errors;

      if (results.length > 0) {
        errors["sameAddressError"] = "Do not enter same Address";
      } else {
        errors["sameAddressError"] = "";
      }
      this.setState({ errors: errors });
    }
  };

  /**
   * This method used to new field
   * @param e
   * @param value
   */
  onPlusClick = (e, value, i) => {
    let selectedAddressData = this.state.selectedAddressData;
    let selectedAddressD = { isSelectedAddress: false };
    selectedAddressData.push(selectedAddressD);
    this.state.address.push({
      address: "",
    });
    this.setState({ selectedAddressData });
  };
  /**
   * This Method is used for Blur input
   * @param {*} event
   */
  onBlurInput = (event) => {
    event.target.placeholder = "Address";
  };
  /**
   * This method is used for focus input
   * @param {*} event
   */
  onFocusInput = (event) => {
    debugger;
    event.target.placeholder = "";
  };
  /**
   * This method is used to get address field value
   * @param e
   * @param value
   * @param key
   * @param searchValue
   */
  onHandleAddressChange = (e, value, key, searchValue) => {
    let data = this.state.address;
    data[key].address = e;
    data[key].search = e;

    let selectedAddressData = this.state.selectedAddressData;
    if (e === "") {
      if (selectedAddressData.length > 0) {
        selectedAddressData[key].isSelectedAddress = false;
      }
    }
    this.setState({ address: data });
  };
  render() {
    return (
      <div>
        {this.state.address &&
          this.state.address.map((cdiv, i) => {
            return (
              <div key={i} id="address">
                <PlaceAddress
                  index={i}
                  tabIndex={0}
                  streetPlaceholder="Street Number"
                  value={cdiv.address}
                  onChange={(e) => {
                    this.onHandleAddressChange(e, "address", i, "search");
                  }}
                  placeholder="Address"
                  className={
                    (
                      cdiv.address === undefined
                        ? cdiv
                        : cdiv.address.length > 0
                    )
                      ? "location-search-input form-control textvisible"
                      : "location-search-input form-control"
                  }
                  id={"search" + i + "Txt"}
                  elmkey="address"
                  onFocus={(e) => {
                    this.onFocusInput.bind(this);
                  }}
                  onBlur={(e) => {
                    this.onBlurInput.bind(this);
                  }}
                  country="MX"
                  onSelect={(e) => {
                    this.handleSelectSuggest(e, "address", i, "search");
                  }}
                />
                <div className="add-remove">
                  <div className="add-minus">
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </div>
                  {this.state.address.length - 1 === i ? (
                    <div>
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={this.onPlusClick.bind(this)}
                      ></i>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {this.state.errors["sameAddressError"] ? (
                  <p>
                    <span className="error-msg">
                      {this.state.errors["sameAddressError"]}
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    );
  }
}
export default Locator;
