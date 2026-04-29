import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json" 
import * as recovery_password_page from "../locators/recovery_password_page.json" 
import * as result_page from "../locators/result_page.json" 

describe('проверка авторизации', function () {
  
  beforeEach('Начало теста', function () {
         cy.visit('/'); // зайти на сайт 
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверить цвет кнопки
           });
 
  afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');  // есть крестик и он виден пользователю 
         cy.get(result_page.link).should('be.visible'); //проверка на видимость элемента
        });

    it('верный логин и пароль', function () {  // название автотетста
         cy.get(main_page.email).type(data.login); // нашел поле логин ввел верный логин
         cy.get(main_page.password).type(data.password); // нашел поле пароль ввел верный пароль 
         cy.get(main_page.link).should('be.visible'); //проверка на видимость элемента
         cy.get(main_page.login_button).click(); //нажал войти 
         cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверка на правильность написания текста
     })
    it('проверка валидации', function () {
         cy.get(main_page.email).type('germandolnikov.ru'); // нашел поле логин ввел логин без @
         cy.get(main_page.password).type(data.password); // нашел поле пароль ввел верный пароль 
         cy.get(main_page.link).should('be.visible'); //проверка на видимость элемента
         cy.get(main_page.login_button).click(); //нажал войти 
         cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверка на правильность текста
    })
    it('проверка функнии забыл пороль', function () {
    	 cy.get(main_page.fogot_pass_btn).click(); // забыл пороль
    	 cy.get(recovery_password_page.title).contains('Восстановите пароль'); // проверка на правильность текста 
    	 cy.get(recovery_password_page.link).should('be.visible'); //проверка на видимость элемента
    	 cy.get(recovery_password_page.close).should('be.visible');  // есть крестик и он виден пользователю
    	 cy.get(recovery_password_page.email).type(data.login); // нашел поле логин ввел верный логин
         cy.get(recovery_password_page.send_button).click(); // нажал отправить коl
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверка на правильность текста
    }) 
     it('не правильный пароль', function () {
     	 cy.get(main_page.email).type(data.login); // нашел поле логин ввел логин
         cy.get(main_page.password).type('qa_one_love'); // нашел поле пароль ввел не верный пароль 
         cy.get(main_page.link).should('be.visible'); //проверка на видимость элемента
         cy.get(main_page.login_button).click(); //нажал войти 
         cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка на правильность текста
    })
      it('не правильный логин', function () {
     	 cy.get(main_page.email).type('german@dolnkov.ru'); // нашел поле логин ввел неверный логин
         cy.get(main_page.password).type(data.password); // нашел поле пароль ввел верный пароль 
         cy.get(main_page.link).should('be.visible'); //проверка на видимость элемента
         cy.get(main_page.login_button).click(); //нажал войти 
         cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка на правильность текста
    })
      it('проверка на приведение к строчным буквам', function () {  // название автотетста
         cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // нашел поле логин c ввел верный логин с заглавными буквами 
         cy.get(main_page.password).type(data.password); // нашел поле пароль ввел верный пароль 
         cy.get(main_page.link).should('be.visible'); //проверка на видимость элемента
         cy.get(main_page.login_button).click(); //нажал войти 
         cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверка на правильность написания текста
         
     })
 }) 






// посетил сайт 
// нашел поле логин, ввел логин 
// нашел поле пароль, ввел пороль 
// нашел кнопку войти, нажал войти 
// проверить успех авторизации 
