"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Formulario_model_1 = __importDefault(require("./Formulario.model"));
const FormularioRespondido_model_1 = __importDefault(require("./FormularioRespondido.model"));
const Rol_model_1 = __importDefault(require("./Rol.model"));
let Usuario = class Usuario extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Usuario.prototype, "codusuario", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "correoelectronico", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.NOW),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Usuario.prototype, "fechadecreaciondecuenta", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasenia", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN(),
    }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "confirmado", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Formulario_model_1.default),
    __metadata("design:type", Array)
], Usuario.prototype, "formularios", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => FormularioRespondido_model_1.default),
    __metadata("design:type", Array)
], Usuario.prototype, "formularioRespondido", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Rol_model_1.default),
    __metadata("design:type", Array)
], Usuario.prototype, "roles", void 0);
Usuario = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "usuario",
        timestamps: false,
    })
], Usuario);
exports.default = Usuario;
//# sourceMappingURL=Usuario.model.js.map