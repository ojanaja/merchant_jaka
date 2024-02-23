import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class EditProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            quantity: "",
            loading: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        const { product_name, product_price, product_quantity } = this.props.selectedProduct;
        this.setState({
            name: product_name,
            price: product_price.toString(),
            quantity: product_quantity.toString()
        })
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }

    updateProduct = () => {
        const { name, price, quantity } = this.state;
        this.setState({ errorMessage: "", loading: true });

        if (name && price && quantity) {
            fetch(`http://dummy.restapiexample.com/api/v1/update/${this.props.selectedProduct.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product_name: this.state.name,
                    product_price: parseFloat(this.state.price),
                    product_quantity: parseInt(this.state.quantity)
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.closeModal();
                    this.props.updateProduct({
                        product_name: res.product_name,
                        product_price: res.product_price,
                        product_quantity: res.product_quantity,
                        id: this.props.selectedProduct.id
                    });
                })
                .catch(() => {
                    this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
                })
        } else {
            this.setState({ errorMessage: "Fields are empty.", loading: false })
        }
    }

    render() {
        const { isOpen, closeModal } = this.props;
        const { name, price, quantity, loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Product</Text>

                    <TextInput
                        value={name}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "name")}
                        placeholder="Product Name" />

                    <TextInput
                        value={price}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "price")}
                        placeholder="Price" />

                    <TextInput
                        value={quantity}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "quantity")}
                        placeholder="Quantity" />

                    {loading ? <Text style={styles.message}>Please Wait...</Text> : errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this.updateProduct} style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeModal} style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}

export default EditProductModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
});
