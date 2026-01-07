# Button 组件测试用例说明

## 测试覆盖范围

根据需求分析文档，测试用例覆盖了以下功能点：

### 1. 基础渲染 (Basic Rendering)

- ✅ 按钮元素正确渲染
- ✅ 默认插槽内容渲染
- ✅ 自定义类名支持

### 2. 按钮类型 (Button Types)

- ✅ Primary 类型
- ✅ Secondary 类型
- Text 类型
- ✅ Link 类型
- ✅ Danger 类型

### 3. 按钮尺寸 (Button Sizes)

- ✅ Large 尺寸
- ✅ Medium 尺寸
- ✅ Small 尺寸
- ✅ Mini 尺寸

### 4. 按钮状态 (Button States)

- ✅ Disabled 状态
- ✅ Loading 状态
- ✅ 状态下的交互限制

### 5. 按钮形状 (Button Shapes)

- ✅ Round 圆角
- ✅ Circle 圆形
- ✅ Plain 朴素样式

### 6. 图标支持 (Button Icons)

- ✅ 左侧图标
- ✅ 右侧图标
- ✅ 仅图标按钮

### 7. 事件处理 (Button Events)

- ✅ Click 事件
- ✅ Focus/Blur 事件
- ✅ Mouseenter/Mouseleave 事件

### 8. 键盘交互 (Keyboard Interactions)

- ✅ Enter 键触发
- ✅ Space 键触发
- ✅ Tab 键导航
- ✅ 禁用状态下的键盘交互限制

### 9. 无障碍访问 (Accessibility)

- ✅ ARIA 角色
- ✅ ARIA 标签
- ✅ ARIA 状态属性
- ✅ Tabindex 管理

### 10. 按钮属性 (Button Attributes)

- ✅ Native type 属性
- ✅ Autofocus 支持
- ✅ Form 相关属性

### 11. 插槽支持 (Button Slots)

- ✅ 默认插槽
- ✅ 图标插槽
- ✅ 多元素插槽

### 12. 安全性 (Security and Safety)

- ✅ XSS 防护
- ✅ 防重复提交

### 13. 组合场景 (Button Combinations)

- ✅ 多属性组合
- ✅ 图标和文本组合

### 14. 边界情况 (Edge Cases)

- ✅ 空内容处理
- ✅ 长文本处理
- ✅ 特殊字符处理
- ✅ 空值处理

## 运行测试

```bash
# 在 packages/components 目录下运行
pnpm test

# 运行特定测试文件
pnpm test Button.test.tsx

# 查看测试覆盖率
pnpm test:coverage

# UI 模式
pnpm test:ui
```

## 注意事项

1. 当前部分测试用例会失败，因为 Button 组件还未完全实现这些功能
2. 测试用例使用 JSX 虚拟节点形式（h 函数）
3. 所有测试用例的 name 属性使用英文描述
4. 测试用例遵循 TDD（测试驱动开发）原则，先写测试后实现功能
