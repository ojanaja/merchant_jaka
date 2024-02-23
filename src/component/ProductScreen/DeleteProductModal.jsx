import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class DeleteProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorMessage: ''
        };
    }

    deleteProduct = () => {
        const { selectedProduct, closeModal, deleteProduct } = this.props;
        this.setState({ errorMessage: "", loading: true });

        fetch(`http://your-api-url/products/${selectedProduct.id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                closeModal();
                deleteProduct(selectedProduct.id);
            })
            .catch((err) => {
                console.error("Error deleting product:", err);
                this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
            })
    }

    render() {
        const { isOpen, closeModal, selectedProduct } = this.props;
        const { loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
                transparent
            >
                <View style={styles.backgroundContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Would you like to delete product: {selectedProduct.product_name}?</Text>
                        <Text style={styles.subTitle}>If you are sure to delete this product, click the Agree button. If not, click Disagree.</Text>

                        {loading ? <Text style={styles.message}>Please Wait...</Text> : errorMessage ? <Text style={styles.message}>{errorMessage}</Text> : null}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.deleteProduct}>
                                <Text style={styles.buttonText}>Agree</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={closeModal}>
                                <Text style={{ ...styles.buttonText, color: "skyblue" }}>Disagree</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default DeleteProductModal;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    container: {
        width: "90%",
        padding: 15,
        maxHeight: "40%",
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 16
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignSelf: "flex-end"
    },
    buttonText: {
        color: "tomato",
        fontSize: 17
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
});
