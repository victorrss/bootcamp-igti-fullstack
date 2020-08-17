export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "My Bank API description",
        "version": "1.0.0",
        "title": "My Bank API"
    },
    "host": "localhost:8080",
    "tags": [
        {
            "name": "account",
            "description": "Account Management"
        }
    ],
    "paths": {
        "/account": {
            "get": {
                "tags": [
                    "account"
                ],
                "summary": "Get all accounts",
                "description": "Returns a all accounts",
                "operationId": "getAllAccount",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Account"
                            }
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            },
            "post": {
                "tags": [
                    "account"
                ],
                "summary": "Add a new account to the bank",
                "description": "",
                "operationId": "addAccount",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object that needs to be added to the bank",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/AccountPost"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    },
                    "400": {
                        "description": "various"
                    }
                }
            },
            "put": {
                "tags": [
                    "account"
                ],
                "summary": "Update an existing account",
                "description": "",
                "operationId": "updateAccount",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object that needs to be added to the bank",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    },
                    "400": {
                        "description": "various"
                    }
                }
            }
        },
        "/account/{accountId}": {
            "get": {
                "tags": [
                    "account"
                ],
                "summary": "Find account by ID",
                "description": "Returns a single account",
                "operationId": "getAccountById",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "accountId",
                        "in": "path",
                        "description": "ID of account to return",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            },
            "delete": {
                "tags": [
                    "account"
                ],
                "summary": "Delete a account",
                "description": "",
                "operationId": "deleteAccount",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "accountId",
                        "in": "path",
                        "description": "Account id to delete",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "400": {
                        "description": "various"
                    }
                }
            }
        },
        "/account/updateBalance": {
            "patch": {
                "tags": [
                    "account"
                ],
                "summary": "Update balance",
                "description": "",
                "operationId": "updateBalance",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object that needs to be added to the bank",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/AccountUpdateBalance"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            }
        }
    },
    "definitions": {
        "Account": {
            "type": "object",
            "required": [
                "name",
                "balance"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "name": {
                    "type": "string",
                    "example": "João da Silva"
                },
                "balance": {
                    "type": "number"
                }
            }
        },
        "AccountPost": {
            "type": "object",
            "required": [
                "name",
                "balance"
            ],
            "properties": {
                "name": {
                    "type": "string",
                    "example": "João da Silva"
                },
                "balance": {
                    "type": "number"
                }
            }
        },
        "AccountUpdateBalance": {
            "type": "object",
            "required": [
                "id",
                "balance"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "balance": {
                    "type": "number"
                }
            }
        }
    }
}