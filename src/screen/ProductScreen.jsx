/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddProductModal from '../component/ProductScreen/AddProductModal';
import EditProductModal from '../component/ProductScreen/EditProductModal';
import DeleteProductModal from '../component/ProductScreen/DeleteProductModal';
import Colors from '../constants/Colors';

class ProductScreen extends Component {
  state = {
    products: [],
    isAddProductModalOpen: false,
    isEditProductModalOpen: false,
    isDeleteProductModalOpen: false,
    loading: false,
    errorMessage: '',
    selectedProduct: {},
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ errorMessage: '', loading: true });
    fetch('http://dummy.restapiexample.com/api/v1/employees', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => this.setState({
        products: res.data, // Assuming res.data is the array of products
        loading: false,
        errorMessage: '',
      }))
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({
          loading: false,
          errorMessage: 'Network Error. Please try again.',
        });
      });
  };


  toggleAddProductModal = () => {
    this.setState({ isAddProductModalOpen: !this.state.isAddProductModalOpen });
  };

  toggleEditProductModal = () => {
    this.setState({ isEditProductModalOpen: !this.state.isEditProductModalOpen });
  };

  toggleDeleteProductModal = () => {
    this.setState({ isDeleteProductModalOpen: !this.state.isDeleteProductModalOpen });
  };

  addProduct = (data) => {
    this.setState({ products: [data, ...this.state.products] });
  };

  updateProduct = (data) => {
    this.setState({ products: this.state.products.map(product => product.id === data.id ? data : product) });
  };

  deleteProduct = productId => {
    this.setState({ products: this.state.products.filter(product => product.id !== productId) });
  };

  render() {
    const { loading, errorMessage, products, isAddProductModalOpen,
      isEditProductModalOpen, isDeleteProductModalOpen, selectedProduct } = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={this.toggleAddProductModal}
          style={styles.buttonAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.container}>
            {Array.isArray(products) && products.map((data, index) => <View
              style={styles.productListContainer}
              key={data.id}>
              <Text style={{ ...styles.listItem, color: 'red' }}>{index + 1}.</Text>
              <Text style={styles.name}>{data.product_name}</Text>
              <Text style={styles.listItem}>Harga Produk: {data.product_price}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleEditProductModal();
                    this.setState({ selectedProduct: data });
                  }}
                  style={{ ...styles.button, marginVertical: 0 }}>
                  <Text style={styles.buttonText}>Ubah</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.toggleDeleteProductModal();
                    this.setState({ selectedProduct: data });
                  }}
                  style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: 'tomato' }}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>)}

            {loading ? <Text
              style={styles.message}>Tunggu Sebentar...</Text> : errorMessage ? <Text
                style={styles.message}>{errorMessage}</Text> : null}

            {isAddProductModalOpen ? <AddProductModal
              isOpen={isAddProductModalOpen}
              closeModal={this.toggleAddProductModal}
              addProduct={this.addProduct}
            /> : null}

            {isEditProductModalOpen ? <EditProductModal
              isOpen={isEditProductModalOpen}
              closeModal={this.toggleEditProductModal}
              selectedProduct={selectedProduct}
              updateProduct={this.updateProduct}
            /> : null}

            {isDeleteProductModalOpen ? <DeleteProductModal
              isOpen={isDeleteProductModalOpen}
              closeModal={this.toggleDeleteProductModal}
              selectedProduct={selectedProduct}
              deleteProduct={this.deleteProduct}
            /> : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: Colors.SECONDARY,
  },
  buttonAddProduct: {
    borderRadius: 5,
    marginVertical: 20,
    marginLeft: 20,
    alignSelf: 'flex-start',
    backgroundColor: Colors.SECONDARY,
  },
  buttonText: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  productListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});
