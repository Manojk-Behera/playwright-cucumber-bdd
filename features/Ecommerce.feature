Feature: Ecommerce validations
    @Regression
    Scenario: Placing the Order
    Given a login to Ecommerce application with "testpractice@mailinator.com" and "Kumar@123"
    When Add "ADIDAS ORIGINAL" to Cart
    Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify Order is presesnt in the OrderHistory

    @validation
    Scenario Outline: Placing the Order 
    Given a login to Ecommerce2 application with "<Username>" and "<Password>"
    Then Verify Error message is displayed in the Login page
    
    Examples:
        | Username                     | Password   |
        | testpractice@mailinator.com  | Kumar@123  |
        | testpra@mailinator.com       | abcd@123   | 