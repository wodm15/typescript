interface User {
    id: number;
    name: string;
    role: "admin" | "customer";
}

interface Beverage {
    name: string;
    price: number;
}

interface Order {
    orderId: number;
    customerId: number;
    customerrName: string;
    berverageName: string;
    status: "plcaed" | "completed" | "picked-up";
}

