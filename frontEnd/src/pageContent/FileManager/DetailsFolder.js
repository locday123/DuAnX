function DetailsFolder({folder}) {
    return (
        <Box>
            <table>
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td class="e-fe-value" title="Folder">Folder</td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>
                            <span class="e-fe-value" title="0 B">0 B</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td class="e-fe-value" title="Files\123123\test\kkl">Files\123123\test\kkl</td>
                    </tr>
                    <tr>
                        <td>Modified</td>
                        <td class="e-fe-value">November 19, 2023 21:40:18</td>
                    </tr>
                </tbody>
            </table>
        </Box>
    )
}

export default DetailsFolder