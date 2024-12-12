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
const Pregunta_model_1 = __importDefault(require("./Pregunta.model"));
const Opcion_model_1 = __importDefault(require("./Opcion.model"));
const FormularioRespondido_model_1 = __importDefault(require("./FormularioRespondido.model"));
let RespuestaUsuario = class RespuestaUsuario extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], RespuestaUsuario.prototype, "codrespuesta", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pregunta_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], RespuestaUsuario.prototype, "codpregunta", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Opcion_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], RespuestaUsuario.prototype, "idrespuesta", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => FormularioRespondido_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], RespuestaUsuario.prototype, "codformulariorespondido", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => FormularioRespondido_model_1.default),
    __metadata("design:type", FormularioRespondido_model_1.default)
], RespuestaUsuario.prototype, "formularioRespondido", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300),
        allowNull: true,
    }),
    __metadata("design:type", String)
], RespuestaUsuario.prototype, "respuestatexto", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pregunta_model_1.default),
    __metadata("design:type", Pregunta_model_1.default)
], RespuestaUsuario.prototype, "pregunta", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Opcion_model_1.default),
    __metadata("design:type", Opcion_model_1.default)
], RespuestaUsuario.prototype, "opcion", void 0);
RespuestaUsuario = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "respuestausuario",
        timestamps: false,
    })
], RespuestaUsuario);
exports.default = RespuestaUsuario;
//# sourceMappingURL=RespuestaUsuario.js.map