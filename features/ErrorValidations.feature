Feature: Ecommerce validations
    @validation
    Scenario Outline: Placing the Order 
    Given a login to Ecommerce2 application with "<Username>" and "<Password>"
    Then Verify Error message is displayed in the Login page
    
    Examples:
        | Username                     | Password   |
        | testpractice@mailinator.com  | Kumar@123  |
        | testpra@mailinator.com       | abcd@123   |  