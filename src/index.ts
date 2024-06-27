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
    customerName: string;
    beverageName: string;
    status: "placed" | "completed" | "picked-up";
}

let beverages : Beverage[] =[];
let orders: Order[] = [];

//에드민 권한 체크 함수
function isAdmin(user: User): boolean {
    return user.role === "admin";
}

//고객 권한 체크 함수
function isCustomer(user: User): boolean {
    return user.role === "customer";
}

//음료 목록에 음료 새롭게 등록 함수(admin만 가능하게)
function addBeverage(user: User, name: string, price: number): void {
    if(!isAdmin(user)){
        return console.log("권한이 없습니다.");
    }

    const newBeverage: Beverage = { name, price};
    beverages.push(newBeverage);
}

//음료 목록에 음료 삭제하는 함수(admin만 가능하게)
function removeBeverage(user: User, berverageName: string): void {
    if(!isAdmin(user)){
        return console.log("권한이 없습니다.");

    beverages = beverages.filter((beverage) => beverage.name !== berverageName);
    }
}

//음료 조회
function getBeverage(user:User): Beverage[] {
    if(!user){
        return [];
    }
    return beverages;
}

//음료 찾기
function findBeverage(beverageName: string): Beverage | undefined {
    return beverages.find((beverage) => beverage.name === beverageName);
  }

//음료 주문
function placeOrder(user: User, beverageName: string): number {
    if (!isCustomer(user)) {
      console.log("권한이 없습니다.");
      return -1;
    }
  
    const beverage = findBeverage(beverageName);
    if (!beverage) {
      console.log("해당 음료를 찾을 수 없습니다.");
      return -1;
    }
  
    const newOrder: Order = {
      orderId: orders.length + 1,
      customerId: user.id,
      customerName: user.name,
      beverageName,
      status: "placed",
    };
    orders.push(newOrder);
    return newOrder.orderId;
  }

//음료 준비완료
function completeOrder(user: User, orderId: number): void {
    if (!isAdmin(user)) {
      console.log("권한이 없습니다.");
      return;
    }
  
    const order = orders.find((order) => order.orderId === orderId);
    if (order) {
      order.status = "completed"; 
      console.log(
        `[고객 메시지] ${order.customerName}님~ 주문하신 ${order.beverageName} 1잔 나왔습니다~`
      );
    }
  }
//음료 수령
function pickUpOrder(user: User, orderId: number): void {
    if (!isCustomer(user)) {
      console.log("권한이 없습니다.");
      return;
    }
  
    const order = orders.find(
      (order) => order.orderId === orderId && order.customerId === user.id
    );
    if (order && order.status === "completed") {
      order.status = "picked-up";
      console.log(
        `[어드민 메시지] 고객 ID[${order.customerId}]님이 주문 ID[${orderId}]을 수령했습니다.`
      );
    }
  }
