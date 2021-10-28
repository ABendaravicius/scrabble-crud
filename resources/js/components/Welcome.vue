<template>
    <table class="table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>John Doe</td>
            <td>john@doe.com</td>
            <td>+44123123123</td>
            <td>2021-10-21</td>
            <td></td>
        </tr>
        <tr>
            <td>Jane Doe</td>
            <td>jane@doe.com</td>
            <td>+44465456456</td>
            <td>2021-10-11</td>
            <td></td>
        </tr>
        <tr>
            <td>John Doe</td>
            <td>john@doe.com</td>
            <td>+44123123123</td>
            <td>2021-10-21</td>
            <td></td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {},
    setup(props) {
        return {}
    }
});
</script>
