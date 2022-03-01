function CustomerDTO() {
    let id;
    let name;
    let address;
    let tel;

}

Object.defineProperty(CustomerDTO, 'id', {
    get id() {
        return id;
    },
    set id(value) {
        id = value;
    }
});


Object.defineProperty(CustomerDTO, 'name', {
    get Name() {
        return name;
    },
    set Name(value) {
        name = value;
    }
});





Object.defineProperty(CustomerDTO, 'address', {
    get Address() {
        return address;
    },
    set Address(value) {
        address = value;
    }
});


Object.defineProperty(CustomerDTO, 'tel', {
    get Tel() {
        return tel;
    },
    set Tel(value) {
        tel= value;
    }
});