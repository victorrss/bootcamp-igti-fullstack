const doc = {
    "swagger": "2.0",
    "info": {
        "description": "Desafio Módulo 2 - Bootcamp IGTI Fullstack",
        "version": "1.0.0",
        "title": "GradesControl API"
    },
    "host": "localhost:8080",
    "tags": [
        {
            "name": "grade",
            "description": "Everything about your Grades"
        }
    ],
    "paths": {
        "/grade": {
            "post": {
                "tags": [
                    "grade"
                ],
                "summary": "Add a new grade to the store",
                "description": "",
                "operationId": "addGrade",
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
                        "description": "Grade object that needs to be added to the store",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeUpdatePost"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            }
        },
        "/grade/{gradeId}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Find grade by ID",
                "description": "Returns a single grade",
                "operationId": "getGradeById",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "gradeId",
                        "in": "path",
                        "description": "ID of grade to return",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            },
            "put": {
                "tags": [
                    "grade"
                ],
                "summary": "Update an existing grade",
                "description": "",
                "operationId": "updateGrade",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "gradeId",
                        "in": "path",
                        "description": "ID of grade that needs to be updated",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grade object that needs to be added to the store",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeUpdatePost"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            },
            "delete": {
                "tags": [
                    "grade"
                ],
                "summary": "Deletes a grade",
                "description": "",
                "operationId": "deleteGrade",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "gradeId",
                        "in": "path",
                        "description": "Grade id to delete",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "400": {
                        "description": "Invalid ID supplied"
                    }
                }
            }
        },
        "/grade/notas/{student}/{subject}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Get a student's total grade in a discipline",
                "description": "Returns a total grade",
                "operationId": "getTotalGradeByStudentAndSubject",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "student",
                        "in": "path",
                        "description": "student to return",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "subject",
                        "in": "path",
                        "description": "subject to return",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "notas": {
                                    "type": "number",
                                    "description": "Sum of grades."
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            }
        },
        "/grade/media/{subject}/{type}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Get the average of the grids of a given subject and type",
                "description": "Average a total grade",
                "operationId": "getAverageGradeBySubjectAndType",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "subject",
                        "in": "path",
                        "description": "subject to return",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "type",
                        "in": "path",
                        "description": "type to return",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "media": {
                                    "type": "number",
                                    "description": "Average of grades"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Various"
                    }
                }
            }
        },
        "/grade/melhores/{subject}/{type}": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Return the three best grades according to a determined subject and type.",
                "description": "Return the three best grades",
                "operationId": "getBestGrades",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "subject",
                        "in": "path",
                        "description": "subject to return",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "type",
                        "in": "path",
                        "description": "type to return",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Grade"
                            }
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
        "Grade": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "student": {
                    "type": "string",
                    "description": "João da Silva"
                },
                "subject": {
                    "type": "string",
                    "description": "03 - React"
                },
                "type": {
                    "type": "string",
                    "description": "Fórum"
                },
                "value": {
                    "type": "integer",
                    "format": "int64"
                },
                "timestamp": {
                    "type": "string",
                    "format": "date-time"
                }
            }
        },
        "GradeUpdatePost": {
            "type": "object",
            "properties": {
                "student": {
                    "type": "string",
                    "description": "João da Silva"
                },
                "subject": {
                    "type": "string",
                    "description": "03 - React"
                },
                "type": {
                    "type": "string",
                    "description": "Fórum"
                },
                "value": {
                    "type": "integer",
                    "format": "int64"
                }
            }
        }
    }
}

export default doc